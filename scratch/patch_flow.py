import sys

def patch_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()
    
    # 1. Add CSS
    css_to_add = """
    /* --- FLOW PUZZLE CSS --- */
    .flow-puzzle-container {
      position: relative;
      margin: 20px auto;
      width: fit-content;
      user-select: none;
      touch-action: none;
    }
    .flow-grid {
      display: grid;
      gap: 2px;
      background: var(--grid-line);
      border: 2px solid var(--grid-line);
      padding: 2px;
      border-radius: 8px;
    }
    .flow-cell {
      width: 40px;
      height: 40px;
      background: var(--void);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }
    .flow-cell.is-endpoint {
      /* endpoints get a colored circle */
    }
    .flow-endpoint {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      z-index: 2;
      box-shadow: 0 0 8px currentColor;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.6rem;
      font-weight: bold;
      color: var(--void);
      cursor: grab;
    }
    .flow-endpoint:active {
      cursor: grabbing;
    }
    .flow-svg-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      pointer-events: none;
      z-index: 1;
    }
    .flow-path-line {
      fill: none;
      stroke-width: 12px;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0.8;
    }
  </style>"""
    content = content.replace("  </style>", css_to_add, 1)

    # 2. Add state init in two places
    cloud_state_target = "           puzzleWordle: cloudState.puzzleWordle || { guesses: [], statuses: [], solved: false, gameOver: false },"
    cloud_state_replace = cloud_state_target + "\n           puzzleFlow: cloudState.puzzleFlow || { paths: {}, solved: false },"
    content = content.replace(cloud_state_target, cloud_state_replace)

    day_state_target = "          dayState.puzzleWordle = cloudState.puzzleWordle || { guesses: [], statuses: [], solved: false, gameOver: false };"
    day_state_replace = day_state_target + "\n          dayState.puzzleFlow = cloudState.puzzleFlow || { paths: {}, solved: false };"
    content = content.replace(day_state_target, day_state_replace)

    # 3. Add renderFlowPuzzle function and update renderPuzzle
    render_puzzle_target = """      function renderPuzzle(slug, puzzleData, containerEl) {"""
    render_flow_puzzle = """
      function renderFlowPuzzle(puzzleData, containerEl) {
        containerEl.innerHTML = '';

        const intro = document.createElement('p');
        intro.className = 'puzzle-intro';
        intro.textContent = puzzleData.narrative || "Connect matching pairs by drawing continuous pipes. Pipes cannot intersect, and every cell must be filled.";
        containerEl.appendChild(intro);

        const flowContainer = document.createElement('div');
        flowContainer.className = 'flow-puzzle-container';
        containerEl.appendChild(flowContainer);

        const rows = puzzleData.gridSize.rows;
        const cols = puzzleData.gridSize.cols;

        const gridEl = document.createElement('div');
        gridEl.className = 'flow-grid';
        gridEl.style.gridTemplateColumns = `repeat(${cols}, 40px)`;
        gridEl.style.gridTemplateRows = `repeat(${rows}, 40px)`;
        flowContainer.appendChild(gridEl);

        const svgEl = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgEl.className = 'flow-svg-layer';
        flowContainer.appendChild(svgEl);

        const colors = [
          'var(--neon-pink)', 'var(--neon-cyan)', 'var(--neon-green)', 'var(--neon-yellow)',
          '#ff9900', '#9900ff', '#00ff99', '#ff0055'
        ];
        
        let endpointsByCell = {}; // "r,c" -> { pairId, color, label }
        puzzleData.pairs.forEach((pair, idx) => {
          const color = colors[idx % colors.length];
          const [ep1, ep2] = pair.endpoints; // e.g. [0,0]
          endpointsByCell[`${ep1[0]},${ep1[1]}`] = { pairId: pair.id, color, label: pair.labelA || pair.id };
          endpointsByCell[`${ep2[0]},${ep2[1]}`] = { pairId: pair.id, color, label: pair.labelB || pair.id };
        });

        // Initialize state
        dayState.puzzleFlow = dayState.puzzleFlow || { paths: {}, solved: false };
        let currentPaths = dayState.puzzleFlow.paths || {};
        
        let cellElements = [];

        for (let r = 0; r < rows; r++) {
          cellElements[r] = [];
          for (let c = 0; c < cols; c++) {
            const cell = document.createElement('div');
            cell.className = 'flow-cell';
            cell.dataset.r = r;
            cell.dataset.c = c;
            
            const ep = endpointsByCell[`${r},${c}`];
            if (ep) {
              cell.classList.add('is-endpoint');
              const circle = document.createElement('div');
              circle.className = 'flow-endpoint';
              circle.style.backgroundColor = ep.color;
              circle.style.color = ep.color;
              circle.title = ep.label;
              cell.appendChild(circle);
            }
            gridEl.appendChild(cell);
            cellElements[r][c] = cell;
          }
        }

        // Draw paths based on current state
        function renderPaths() {
          svgEl.innerHTML = '';
          Object.keys(currentPaths).forEach(pairId => {
            const pathArr = currentPaths[pairId];
            if (!pathArr || pathArr.length === 0) return;
            
            // Find color
            const pair = puzzleData.pairs.find(p => p.id === pairId);
            const pIdx = puzzleData.pairs.indexOf(pair);
            const color = colors[pIdx % colors.length];

            const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
            polyline.className = 'flow-path-line';
            polyline.style.stroke = color;
            
            const points = pathArr.map(coord => {
              const [r, c] = coord;
              // center of cell
              // wait, the svg is absolute over the grid. Grid has 2px gap and 2px padding.
              // Cell width/height = 40.
              // x = padding(2) + c * (40 + gap(2)) + 20
              const x = 2 + c * 42 + 20;
              const y = 2 + r * 42 + 20;
              return `${x},${y}`;
            });
            polyline.setAttribute("points", points.join(" "));
            svgEl.appendChild(polyline);
          });
        }
        renderPaths();

        let isDrawing = false;
        let activePairId = null;

        // Interaction logic
        function getCellCoordsFromEvent(e) {
          // support touch
          let clientX = e.clientX;
          let clientY = e.clientY;
          if (e.touches && e.touches.length > 0) {
            clientX = e.touches[0].clientX;
            clientY = e.touches[0].clientY;
          }
          const el = document.elementFromPoint(clientX, clientY);
          if (!el) return null;
          const cell = el.closest('.flow-cell');
          if (cell) {
            return [parseInt(cell.dataset.r), parseInt(cell.dataset.c)];
          }
          return null;
        }

        function handlePointerDown(e) {
          if (dayState.puzzleFlow.solved) return;
          const coords = getCellCoordsFromEvent(e);
          if (!coords) return;
          
          const ep = endpointsByCell[`${coords[0]},${coords[1]}`];
          if (ep) {
            isDrawing = true;
            activePairId = ep.pairId;
            // start new path
            currentPaths[activePairId] = [coords];
            renderPaths();
          } else {
            // Check if clicking on an existing path to truncate it
            let clickedPair = null;
            let clickedIdx = -1;
            Object.keys(currentPaths).forEach(pid => {
              const idx = currentPaths[pid].findIndex(p => p[0] === coords[0] && p[1] === coords[1]);
              if (idx !== -1) {
                clickedPair = pid;
                clickedIdx = idx;
              }
            });
            if (clickedPair) {
              isDrawing = true;
              activePairId = clickedPair;
              currentPaths[clickedPair] = currentPaths[clickedPair].slice(0, clickedIdx + 1);
              renderPaths();
            }
          }
          if(e.cancelable) e.preventDefault();
        }

        function handlePointerMove(e) {
          if (!isDrawing || !activePairId) return;
          const coords = getCellCoordsFromEvent(e);
          if (!coords) return;
          
          const path = currentPaths[activePairId];
          const lastCoord = path[path.length - 1];
          
          if (coords[0] === lastCoord[0] && coords[1] === lastCoord[1]) return; // same cell
          
          // Must be adjacent (up/down/left/right)
          const dr = Math.abs(coords[0] - lastCoord[0]);
          const dc = Math.abs(coords[1] - lastCoord[1]);
          if (dr + dc !== 1) return; // not adjacent, ignore

          // Check if backtracking
          if (path.length > 1 && path[path.length - 2][0] === coords[0] && path[path.length - 2][1] === coords[1]) {
            path.pop(); // backtrack
            renderPaths();
            return;
          }

          // Check if it's an endpoint of a different pair
          const ep = endpointsByCell[`${coords[0]},${coords[1]}`];
          if (ep && ep.pairId !== activePairId) return; // cannot cross into another endpoint

          // Check if it crosses our own path (creates a loop)
          const selfIdx = path.findIndex(p => p[0] === coords[0] && p[1] === coords[1]);
          if (selfIdx !== -1) {
            // Truncate path to loop point
            currentPaths[activePairId] = path.slice(0, selfIdx + 1);
            renderPaths();
            return;
          }

          // Check if it crosses another pair's path
          Object.keys(currentPaths).forEach(pid => {
            if (pid === activePairId) return;
            const otherPath = currentPaths[pid];
            const otherIdx = otherPath.findIndex(p => p[0] === coords[0] && p[1] === coords[1]);
            if (otherIdx !== -1) {
              // break the other path
              currentPaths[pid] = otherPath.slice(0, otherIdx);
            }
          });

          path.push(coords);
          renderPaths();

          // if we hit our target endpoint, stop drawing
          if (ep && ep.pairId === activePairId && path.length > 1) {
            isDrawing = false;
            activePairId = null;
            checkWinCondition();
          }
        }

        function handlePointerUp(e) {
          if (isDrawing) {
            isDrawing = false;
            activePairId = null;
            checkWinCondition();
            dayState.puzzleFlow.paths = currentPaths;
            saveDayState();
          }
        }

        gridEl.addEventListener('mousedown', handlePointerDown);
        gridEl.addEventListener('touchstart', handlePointerDown, {passive: false});
        
        window.addEventListener('mousemove', handlePointerMove);
        window.addEventListener('touchmove', handlePointerMove, {passive: false});
        
        window.addEventListener('mouseup', handlePointerUp);
        window.addEventListener('touchend', handlePointerUp);

        // Cleanup listeners when container is emptied
        const observer = new MutationObserver((mutations) => {
          if (!document.body.contains(gridEl)) {
            window.removeEventListener('mousemove', handlePointerMove);
            window.removeEventListener('touchmove', handlePointerMove);
            window.removeEventListener('mouseup', handlePointerUp);
            window.removeEventListener('touchend', handlePointerUp);
            observer.disconnect();
          }
        });
        observer.observe(document.body, { childList: true, subtree: true });

        const actions = document.createElement('div');
        actions.className = 'puzzle-actions';
        const resetBtn = document.createElement('button');
        resetBtn.className = 'btn-start';
        resetBtn.textContent = 'RESET PIPES';
        resetBtn.onclick = () => {
          currentPaths = {};
          dayState.puzzleFlow.paths = currentPaths;
          dayState.puzzleFlow.solved = false;
          saveDayState();
          victoryBanner.style.display = 'none';
          renderPaths();
        };
        actions.appendChild(resetBtn);

        const victoryBanner = document.createElement('div');
        victoryBanner.className = 'puzzle-victory-banner';
        victoryBanner.textContent = 'SYSTEM CALIBRATED: FLOW ESTABLISHED';
        victoryBanner.style.display = dayState.puzzleFlow.solved ? 'block' : 'none';

        flowContainer.appendChild(actions);
        flowContainer.appendChild(victoryBanner);

        function checkWinCondition() {
          // Check if all pairs are connected
          let allConnected = true;
          puzzleData.pairs.forEach(pair => {
            const p = currentPaths[pair.id];
            if (!p || p.length < 2) {
              allConnected = false;
              return;
            }
            const first = p[0];
            const last = p[p.length - 1];
            // verify first and last are endpoints for this pair
            const epF = endpointsByCell[`${first[0]},${first[1]}`];
            const epL = endpointsByCell[`${last[0]},${last[1]}`];
            if (!epF || epF.pairId !== pair.id || !epL || epL.pairId !== pair.id) {
              allConnected = false;
            }
          });

          if (!allConnected) return;

          // Check full coverage if required
          if (puzzleData.requireFullCoverage) {
            let filledCount = 0;
            Object.keys(currentPaths).forEach(pid => {
              filledCount += currentPaths[pid].length;
            });
            if (filledCount < rows * cols) return;
          }

          // Win!
          dayState.puzzleFlow.solved = true;
          dayState.puzzleFlow.paths = currentPaths;
          saveDayState();
          victoryBanner.style.display = 'block';
        }
      }

      function renderPuzzle(slug, puzzleData, containerEl) {"""
    content = content.replace(render_puzzle_target, render_flow_puzzle)

    # 4. Update switch statement
    switch_target = """        if (slug === 'crossword') {"""
    switch_replace = """        if (slug === 'flow') {
          renderFlowPuzzle(puzzleData, containerEl);
        } else if (slug === 'crossword') {"""
    content = content.replace(switch_target, switch_replace)

    with open(filepath, 'w') as f:
        f.write(content)

if __name__ == "__main__":
    patch_file('day-details.html')
