

    // Load saved colors (or use defaults)
    document.documentElement.style.setProperty('--text-color', localStorage.getItem("text-color") || "#7dd3fc");
    document.documentElement.style.setProperty('--bg-color', localStorage.getItem("bg-color") || "#0d1b2a");

    function flashBackgroundAnimation(duration = 6000) {
        document.body.classList.add('animated-bg');
        setTimeout(() => {
            document.body.classList.remove('animated-bg');
        }, duration);
    }

    

    let rainCtx, rainCanvas;
        let rainDrops = [];
        let rainColor = "#00ff00";
        let rainActive = false;

        function startRain(color = "#00ff00") {
        rainCanvas = document.getElementById("rainCanvas");
        rainCtx = rainCanvas.getContext("2d");
        rainCanvas.width = window.innerWidth;
        rainCanvas.height = window.innerHeight;
        rainColor = color;
        rainDrops = Array.from({ length: 200 }, () => ({
            x: Math.random() * rainCanvas.width,
            y: Math.random() * rainCanvas.height,
            length: 10 + Math.random() * 20,
            speed: 2 + Math.random() * 3
        }));

        if (!rainActive) {
            rainActive = true;
            requestAnimationFrame(drawRain);
        }
        }

        function drawRain() {
        if (!rainActive) return;
        rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        rainCtx.strokeStyle = rainColor;
        rainCtx.lineWidth = 1.2;

        rainDrops.forEach(drop => {
            rainCtx.beginPath();
            rainCtx.moveTo(drop.x, drop.y);
            rainCtx.lineTo(drop.x, drop.y + drop.length);
            rainCtx.stroke();

            drop.y += drop.speed;
            if (drop.y > rainCanvas.height) {
            drop.y = -drop.length;
            drop.x = Math.random() * rainCanvas.width;
            }
        });

        requestAnimationFrame(drawRain);
        }

        function stopRain() {
        rainActive = false;
        if (rainCtx) rainCtx.clearRect(0, 0, rainCanvas.width, rainCanvas.height);
        }

    
    const bootLines = [
      "Booting terminal-homepage-cli v1.2...",
      "[ OK ] Loading system settings",
      "[ OK ] Initializing keyboard mapping",
      "[ OK ] Fetching user profile",
      "[ OK ] Loading search engine interface",
      "[ OK ] Starting command interpreter...",
      "",
      "Welcome $rmr13!"
    ];

    const bootText = document.getElementById("bootText");
    const bootScreen = document.getElementById("bootScreen");

    function runBootScreen(lines, delay = 100, afterDelay = 1000) {
      let i = 0;
      function typeLine() {
        if (i < lines.length) {
          bootText.innerHTML += lines[i] + "\n";
          i++;
          setTimeout(typeLine, delay);
        } else {
          setTimeout(() => {
            bootScreen.style.display = "none";
            flashBackgroundAnimation();
          }, afterDelay);
        }
      }
      typeLine();
    }

    window.addEventListener("DOMContentLoaded", () => {
      runBootScreen(bootLines);
    });

    const form = document.getElementById('multiSearch');
    const input = document.getElementById('searchQuery');
    const promptLabel = document.querySelector('.prompt-line');
        let idleTimer = null;

        function startIdleTimer() {
        clearTimeout(idleTimer);
        promptLabel.classList.remove('pulsing');

        idleTimer = setTimeout(() => {
            promptLabel.classList.add('pulsing');
        }, 3000); // start pulsing after 5 seconds idle
        }

        input.addEventListener('input', startIdleTimer);
        input.addEventListener('focus', startIdleTimer);
        input.addEventListener('blur', () => {
        clearTimeout(idleTimer);
        promptLabel.classList.remove('pulsing');
        });
    const output = document.getElementById('output');
    

    let cachedRepos = []; // store fetched repos here
    const engineIconsContainer = document.getElementById('engineIcons');
    const engines = [
      {
        name: "Google",
        url: "https://www.google.com/search?q=",
        icon: "google.svg",
        filter: "invert(85%)"
      },
      {
        name: "YouTube",
        url: "https://www.youtube.com/results?search_query=",
        icon: "youtube.svg",
        filter: "invert(19%) sepia(92%) saturate(5575%) hue-rotate(358deg) brightness(91%) contrast(128%)"
      },
      {
        name: "Reddit",
        url: "https://www.reddit.com/search/?q=",
        icon: "reddit.svg",
        filter: "invert(64%) sepia(97%) saturate(6452%) hue-rotate(2deg) brightness(97%) contrast(101%)"
      }
    ];

    let currentEngineIndex = 0;
    let selectedEngine = engines[currentEngineIndex].url;

    const iconImg = document.createElement('img');
    iconImg.src = engines[currentEngineIndex].icon;
    iconImg.alt = engines[currentEngineIndex].name;
    iconImg.title = engines[currentEngineIndex].name;
    iconImg.style.filter = engines[currentEngineIndex].filter;
    iconImg.style.width = '20px';
    iconImg.style.height = '20px';
    iconImg.style.cursor = 'pointer';
    iconImg.classList.add('active');
    engineIconsContainer.innerHTML = '';
    engineIconsContainer.appendChild(iconImg);

    iconImg.addEventListener('click', () => {
      currentEngineIndex = (currentEngineIndex + 1) % engines.length;
      updateSearchEngine();
    });

    function updateSearchEngine() {
      const engine = engines[currentEngineIndex];
      selectedEngine = engine.url;
      iconImg.src = engine.icon;
      iconImg.alt = engine.name;
      iconImg.title = engine.name;
      iconImg.style.filter = engine.filter;
    }

    document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'ArrowRight') {
      currentEngineIndex = (currentEngineIndex + 1) % engines.length;
      updateSearchEngine();
    } else if (e.ctrlKey && e.key === 'ArrowLeft') {
      currentEngineIndex = (currentEngineIndex - 1 + engines.length) % engines.length;
      updateSearchEngine();
    }
  });

    

    function typeOutput(text, delay = 15) {
      output.innerHTML = '';
      let i = 0;

      function typeChar() {
        if (i < text.length) {
          const char = text[i] === '\n' ? '<br>' : text[i];
          output.innerHTML += char;
          i++;
          setTimeout(typeChar, delay);
        }
      }

      typeChar();
    }


    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const query = input.value.trim();

      const colorMatch = query.match(/^color\s+-(t|b)\s+(#[0-9a-fA-F]{3,6}|[a-zA-Z]+)$/);
      if (colorMatch) {
        const type = colorMatch[1];
        const color = colorMatch[2];

        if (type === 't') {
            localStorage.setItem("text-color", color);
            document.documentElement.style.setProperty('--text-color', color);
        } else if (type === 'b') {
            localStorage.setItem("bg-color", color);
            document.documentElement.style.setProperty('--bg-color', color);
        }

        // 🔄 Restart animated background
        flashBackgroundAnimation();


        input.value = "";
        return;
        }



      if (query === "color reset") {
        localStorage.removeItem("text-color");
        localStorage.removeItem("bg-color");

        document.documentElement.style.setProperty('--text-color', '#7dd3fc');
        document.documentElement.style.setProperty('--bg-color', '#0d1b2a');

        input.value = "";
        return;
      }


      if (query === "clear") {
        output.textContent = "";
        input.value = "";
        return;
      }

      if (query === "date") {
        const now = new Date().toString();
        output.textContent = `~ $ date\n${now}`;
        input.value = "";
        return;
      }

      if (query === "help") {
        const helpText =
          `Available commands:\n` +
          `  color -t [color]     Change text color (name or hex)\n` +
          `  color -b [color]     Change background color\n` +
          `  color reset          Reset colors to default\n` +
          `  theme [name]         Apply a theme (matrix, aqua, solarized, dark, light)\n` +
          `  date                 Show current date & time\n` +
          `  clear                Clear terminal output\n` +
          `  help                 Show this help message\n` +
          `  [text]               Search using selected engine\n\n` +
          `GitHub commands:\n` +
          `  gh repos             List your public repositories\n` +
          `  gh -r [n]            Open nth repo in new tab (after gh repos)\n\n` +
          `Keyboard shortcuts:\n` +
          `  Ctrl + → / ←         Switch search engine\n` +
          `  Click icon           Also switches search engine\n` +
          `  Ctrl + d + [1-9]     Open nth link in ~/dev\n` +
          `  Ctrl + g + [1-9]     Open nth link in ~/general`;

        typeOutput(helpText);
        input.value = "";
        return;
      }



      if (query.startsWith("rain -c ")) {
        const color = query.split(" ")[2];
        startRain(color);
        typeOutput(`~ $ rain -c ${color}\nRain started.`);
        input.value = "";
        return;
        }

        if (query === "rain stop") {
        stopRain();
        typeOutput("~ $ rain stop\nRain stopped.");
        input.value = "";
        return;
        }

      if (query === "gh repos") {
        output.textContent = "~ $ gh repos\nLoading...";
        fetch("https://api.github.com/users/Moosa-13/repos")
          .then(res => res.json())
          .then(data => {
            cachedRepos = data;
            const repoList = data.map((repo, index) => {
              return `${index + 1}. ${repo.name} — ${repo.language || 'Unknown'}`;
            }).join('\n');
            typeOutput(`~ $ gh repos\n${repoList}`);
          })
          .catch(err => {
            typeOutput(`~ $ gh repos\nError fetching repositories.`);
          });

        input.value = "";
        return;
      }

      const repoOpenMatch = query.match(/^gh\s+-r\s+(\d+)$/);
        if (repoOpenMatch) {
          const index = parseInt(repoOpenMatch[1], 10) - 1;
          if (cachedRepos.length && cachedRepos[index]) {
            window.open(cachedRepos[index].html_url, '_blank');
            typeOutput(`~ $ gh -r ${index + 1}\nOpening ${cachedRepos[index].name}...`);
          } else {
            typeOutput(`~ $ gh -r ${index + 1}\nRepo not found. Try running 'gh repos' first.`);
          }
          input.value = "";
          return;
        }

        if (query.startsWith("theme ")) {
            const themeName = query.split(" ")[1].toLowerCase();

            const themes = {
                matrix:    { text: "#00ff00", bg: "#000000" },
                aqua:      { text: "#7fdbff", bg: "#001f3f" },
                solarized: { text: "#839496", bg: "#002b36" },
                dark:      { text: "#7dd3fc", bg: "#0d1b2a" },
                light:     { text: "#1e293b", bg: "#f8fafc" }
            };

            const theme = themes[themeName];

            if (theme) {
                document.documentElement.style.setProperty('--text-color', theme.text);
                document.documentElement.style.setProperty('--bg-color', theme.bg);
                localStorage.setItem("text-color", theme.text);
                localStorage.setItem("bg-color", theme.bg);

                // Restart background animation
                flashBackgroundAnimation();


                typeOutput(`~ $ theme ${themeName}\nTheme applied.`);
            } else {
                typeOutput(`~ $ theme ${themeName}\nTheme not found.`);
            }

            input.value = "";
            return;
            }


        if (query === "rm -rf /") {
        const fakeDeletes = [
            "deleting /bin",
            "deleting /etc",
            "deleting /boot",
            "deleting /home/rmr13",
            "deleting /var/log",
            "deleting /usr/lib",
            "deleting /dev/null",
            "deleting /system32 🤔",
            "formatting memory...",
            "System wipe complete.",
            "Just kidding :)"
        ];

        document.body.classList.add("wipe-mode");

        let i = 0;
        output.innerHTML = "~ $ rm -rf /<br>";

        function wipeLine() {
            if (i < fakeDeletes.length) {
            output.innerHTML += fakeDeletes[i] + "<br>";
            i++;
            setTimeout(wipeLine, 200);
            } else {
            document.body.classList.remove("wipe-mode");
            }
        }

        wipeLine();
        input.value = "";
        return;
        }

      if (query) {
        window.open(selectedEngine + encodeURIComponent(query), '_blank');
      }

      input.value = "";

    });

    let shortcutState = {
  ctrl: false,
  section: null,
};

document.addEventListener('keydown', (e) => {
  if (e.key === 'Control') {
    shortcutState.ctrl = true;
  }

  if (shortcutState.ctrl && (e.key === 'd' || e.key === 'g')) {
    shortcutState.section = e.key === 'd' ? 'dev' : 'general';
    e.preventDefault(); // avoid browser shortcuts like Ctrl+D
  }

  if (shortcutState.ctrl && shortcutState.section && /^[1-9]$/.test(e.key)) {
    const index = parseInt(e.key, 10) - 1;
    const sectionLinks = document.querySelectorAll(`#${shortcutState.section}-section a`);
    if (sectionLinks[index]) {
      window.open(sectionLinks[index].href, '_blank');
    }
    // Reset after triggering
    shortcutState = { ctrl: false, section: null };
  }
});

document.addEventListener('keyup', (e) => {
  if (e.key === 'Control') {
    shortcutState = { ctrl: false, section: null };
  }
});
