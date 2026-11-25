"use strict";

const CONTACT = {
    discord: "notdev_mayon",
    email: "Notdevmayon@gmail.com",
    github: "@notdevmayon"
};

const LANYARD_USER_ID = "1270404468613189654";

const LANYARD_API_URL =
    `https://api.notdevabhinav.workers.dev/v1/users/${LANYARD_USER_ID}`;

const body = document.body;

const navToggle =
    document.querySelector(".nav-toggle");

const navMenu =
    document.querySelector(".nav-menu");

const roleElement =
    document.querySelector("[data-role]");

const systemTimeElement =
    document.querySelector("[data-system-time]");

const currentYearElement =
    document.querySelector("[data-current-year]");

const mouseGlow =
    document.querySelector(".mouse-glow");

const orbitSystem =
    document.querySelector("[data-orbit-system]");

const contactTriggers =
    document.querySelectorAll("[data-contact]");

const magneticElements =
    document.querySelectorAll("[data-magnetic]");

const prefersReducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

const isTouchDevice =
    window.matchMedia("(pointer: coarse)").matches ||
    "ontouchstart" in window;

if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
        const isOpen =
            navToggle.getAttribute(
                "aria-expanded"
            ) === "true";

        navToggle.setAttribute(
            "aria-expanded",
            String(!isOpen)
        );

        navToggle.setAttribute(
            "aria-label",
            isOpen
                ? "Open navigation menu"
                : "Close navigation menu"
        );

        navMenu.classList.toggle(
            "is-open",
            !isOpen
        );

        body.classList.toggle(
            "nav-open",
            !isOpen
        );
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            navToggle.setAttribute(
                "aria-label",
                "Open navigation menu"
            );

            navMenu.classList.remove(
                "is-open"
            );

            body.classList.remove(
                "nav-open"
            );
        });
    });

    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape") {
            return;
        }

        navToggle.setAttribute(
            "aria-expanded",
            "false"
        );

        navToggle.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        navMenu.classList.remove(
            "is-open"
        );

        body.classList.remove(
            "nav-open"
        );
    });
}

document
    .querySelectorAll('a[href^="#"]')
    .forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior:
                    prefersReducedMotion
                        ? "auto"
                        : "smooth",
                block: "start"
            });
        });
    });

const roles = [
    "GAME SERVER DEVELOPER",
    "HOSTING MANAGER",
    "SERVER OPTIMIZER",
    "INFRASTRUCTURE BUILDER"
];

let currentRole = 0;

function changeRole() {
    if (
        !roleElement ||
        prefersReducedMotion
    ) {
        return;
    }

    roleElement.classList.add(
        "is-changing"
    );

    window.setTimeout(() => {
        currentRole =
            (currentRole + 1) %
            roles.length;

        roleElement.textContent =
            roles[currentRole];

        const roleContainer =
            roleElement.closest(
                ".hero__role"
            );

        if (roleContainer) {
            roleContainer.setAttribute(
                "aria-label",
                roles[currentRole]
            );
        }

        const roleIndex =
            roleContainer?.querySelector(
                ".hero__role-index"
            );

        if (roleIndex) {
            roleIndex.textContent =
                String(
                    currentRole + 1
                ).padStart(2, "0");
        }

        roleElement.classList.remove(
            "is-changing"
        );
    }, 350);
}

if (
    roleElement &&
    !prefersReducedMotion
) {
    window.setInterval(
        changeRole,
        3500
    );
}

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );

if (prefersReducedMotion) {
    revealElements.forEach((element) => {
        element.classList.add(
            "is-visible"
        );
    });
} else if (
    "IntersectionObserver" in window
) {
    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (
                        !entry.isIntersecting
                    ) {
                        return;
                    }

                    entry.target.classList.add(
                        "is-visible"
                    );

                    observer.unobserve(
                        entry.target
                    );
                });
            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -8% 0px"
            }
        );

    revealElements.forEach((element) => {
        revealObserver.observe(element);
    });
} else {
    revealElements.forEach((element) => {
        element.classList.add(
            "is-visible"
        );
    });
}

if (
    mouseGlow &&
    !isTouchDevice &&
    !prefersReducedMotion
) {
    let mouseX =
        window.innerWidth / 2;

    let mouseY =
        window.innerHeight / 2;

    let glowX = mouseX;
    let glowY = mouseY;

    let animationFrame = null;

    document.addEventListener(
        "pointermove",
        (event) => {
            mouseX =
                event.clientX;

            mouseY =
                event.clientY;

            if (!animationFrame) {
                animationFrame =
                    requestAnimationFrame(
                        updateGlow
                    );
            }
        },
        {
            passive: true
        }
    );

    function updateGlow() {
        glowX +=
            (mouseX - glowX) *
            0.08;

        glowY +=
            (mouseY - glowY) *
            0.08;

        mouseGlow.style.transform =
            `translate3d(${glowX}px, ${glowY}px, 0)`;

        animationFrame = null;

        if (
            Math.abs(
                mouseX - glowX
            ) > 0.5 ||
            Math.abs(
                mouseY - glowY
            ) > 0.5
        ) {
            animationFrame =
                requestAnimationFrame(
                    updateGlow
                );
        }
    }
}

if (
    orbitSystem &&
    !isTouchDevice &&
    !prefersReducedMotion
) {
    let targetRotateX = 0;
    let targetRotateY = 0;

    let currentRotateX = 0;
    let currentRotateY = 0;

    let orbitFrame = null;

    const visualContainer =
        orbitSystem.closest(
            ".hero__visual"
        );

    if (visualContainer) {
        visualContainer.addEventListener(
            "pointermove",
            (event) => {
                const rect =
                    visualContainer.getBoundingClientRect();

                if (
                    !rect.width ||
                    !rect.height
                ) {
                    return;
                }

                const x =
                    (event.clientX -
                        rect.left) /
                    rect.width;

                const y =
                    (event.clientY -
                        rect.top) /
                    rect.height;

                targetRotateY =
                    (x - 0.5) * 8;

                targetRotateX =
                    (0.5 - y) * 8;

                if (!orbitFrame) {
                    orbitFrame =
                        requestAnimationFrame(
                            updateOrbit
                        );
                }
            },
            {
                passive: true
            }
        );

        visualContainer.addEventListener(
            "pointerleave",
            () => {
                targetRotateX = 0;
                targetRotateY = 0;

                if (!orbitFrame) {
                    orbitFrame =
                        requestAnimationFrame(
                            updateOrbit
                        );
                }
            }
        );
    }

    function updateOrbit() {
        currentRotateX +=
            (targetRotateX -
                currentRotateX) *
            0.06;

        currentRotateY +=
            (targetRotateY -
                currentRotateY) *
            0.06;

        orbitSystem.style.transform =
            `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg)`;

        orbitFrame = null;

        if (
            Math.abs(
                targetRotateX -
                    currentRotateX
            ) > 0.05 ||
            Math.abs(
                targetRotateY -
                    currentRotateY
            ) > 0.05
        ) {
            orbitFrame =
                requestAnimationFrame(
                    updateOrbit
                );
        }
    }
}

function updateSystemTime() {
    if (!systemTimeElement) {
        return;
    }

    const now =
        new Date();

    const hours =
        String(
            now.getHours()
        ).padStart(2, "0");

    const minutes =
        String(
            now.getMinutes()
        ).padStart(2, "0");

    const seconds =
        String(
            now.getSeconds()
        ).padStart(2, "0");

    systemTimeElement.textContent =
        `${hours}:${minutes}:${seconds}`;
}

if (systemTimeElement) {
    updateSystemTime();

    window.setInterval(
        updateSystemTime,
        1000
    );
}

if (currentYearElement) {
    currentYearElement.textContent =
        String(
            new Date().getFullYear()
        );
}

let activePopup = null;
let previousFocusedElement = null;

function createContactPopup(type) {
    if (activePopup) {
        closeContactPopup();
    }

    previousFocusedElement =
        document.activeElement;

    const isDiscord =
        type === "discord";

    const isEmail =
        type === "email";

    const isGithub =
        type === "github";

    let title = "";
    let label = "";
    let value = "";
    let description = "";
    let showCopy = false;

    if (isDiscord) {
        title = "DISCORD";
        label = "DISCORD ID";
        value = CONTACT.discord;

        description =
            "Use this ID to find and contact Mayon on Discord.";

        showCopy = true;
    }

    if (isEmail) {
        title = "EMAIL";
        label = "EMAIL ADDRESS";
        value = CONTACT.email;

        description =
            "Use this address for project, server, hosting, or infrastructure inquiries.";

        showCopy = true;
    }

    if (isGithub) {
        title = "GITHUB";
        label = "GITHUB ACCOUNT";
        value = CONTACT.github;

        description =
            "A public GitHub profile of mine.";

        showCopy = true;
    }

    if (!title) {
        return;
    }

    const overlay =
        document.createElement(
            "div"
        );

    overlay.className =
        "contact-popup";

    overlay.setAttribute(
        "role",
        "presentation"
    );

    overlay.innerHTML = `
        <div
            class="contact-popup__backdrop"
            data-popup-close
        ></div>

        <div
            class="contact-popup__dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-popup-title"
            aria-describedby="contact-popup-description"
            tabindex="-1"
        >
            <div class="contact-popup__header">
                <span class="contact-popup__index">
                    CONTACT / ${title}
                </span>

                <button
                    class="contact-popup__close"
                    type="button"
                    aria-label="Close popup"
                    data-popup-close
                >
                    <span aria-hidden="true">×</span>
                </button>
            </div>

            <div class="contact-popup__body">
                <span class="contact-popup__label">
                    ${label}
                </span>

                <div class="contact-popup__value-row">
                    <strong
                        class="contact-popup__value"
                        id="contact-popup-title"
                    >
                        ${escapeHTML(value)}
                    </strong>

                    ${
                        showCopy
                            ? `
                                <button
                                    class="contact-popup__copy"
                                    type="button"
                                    data-copy-contact
                                >
                                    COPY
                                </button>
                            `
                            : ""
                    }
                </div>

                <p
                    class="contact-popup__description"
                    id="contact-popup-description"
                >
                    ${escapeHTML(
                        description
                    )}
                </p>

                <div class="contact-popup__status">
                    <span
                        class="contact-popup__status-dot"
                        aria-hidden="true"
                    ></span>

                    <span>
                        SYSTEM / AVAILABLE
                    </span>
                </div>
            </div>
        </div>
    `;

    body.appendChild(
        overlay
    );

    activePopup = overlay;

    requestAnimationFrame(() => {
        overlay.classList.add(
            "is-open"
        );

        const dialog =
            overlay.querySelector(
                ".contact-popup__dialog"
            );

        if (dialog) {
            dialog.focus({
                preventScroll: true
            });
        }
    });

    overlay
        .querySelectorAll(
            "[data-popup-close]"
        )
        .forEach((button) => {
            button.addEventListener(
                "click",
                closeContactPopup
            );
        });

    const copyButton =
        overlay.querySelector(
            "[data-copy-contact]"
        );

    if (
        copyButton &&
        showCopy
    ) {
        copyButton.addEventListener(
            "click",
            async () => {
                await copyContactValue(
                    value,
                    copyButton
                );
            }
        );
    }

    overlay.addEventListener(
        "keydown",
        handlePopupKeyboard
    );

    body.classList.add(
        "popup-open"
    );
}

function closeContactPopup() {
    if (!activePopup) {
        return;
    }

    const popup =
        activePopup;

    popup.classList.remove(
        "is-open"
    );

    body.classList.remove(
        "popup-open"
    );

    window.setTimeout(() => {
        if (popup.parentNode) {
            popup.remove();
        }

        activePopup = null;

        if (
            previousFocusedElement &&
            typeof previousFocusedElement.focus ===
                "function"
        ) {
            previousFocusedElement.focus({
                preventScroll: true
            });
        }

        previousFocusedElement = null;
    }, 250);
}

function handlePopupKeyboard(event) {
    if (event.key === "Escape") {
        event.preventDefault();

        closeContactPopup();

        return;
    }

    if (event.key !== "Tab") {
        return;
    }

    const popup =
        event.currentTarget;

    const focusableElements =
        popup.querySelectorAll(
            'button, a, input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );

    if (
        !focusableElements.length
    ) {
        return;
    }

    const first =
        focusableElements[0];

    const last =
        focusableElements[
            focusableElements.length - 1
        ];

    if (
        event.shiftKey &&
        document.activeElement === first
    ) {
        event.preventDefault();

        last.focus({
            preventScroll: true
        });
    } else if (
        !event.shiftKey &&
        document.activeElement === last
    ) {
        event.preventDefault();

        first.focus({
            preventScroll: true
        });
    }
}

async function copyContactValue(
    value,
    button
) {
    if (
        !navigator.clipboard ||
        typeof navigator.clipboard.writeText !==
            "function"
    ) {
        button.textContent =
            "COPY MANUALLY";

        return;
    }

    try {
        await navigator.clipboard.writeText(
            value
        );

        const originalText =
            button.textContent;

        button.textContent =
            "COPIED";

        button.classList.add(
            "is-copied"
        );

        window.setTimeout(() => {
            button.textContent =
                originalText;

            button.classList.remove(
                "is-copied"
            );
        }, 1600);
    } catch {
        button.textContent =
            "COPY FAILED";

        window.setTimeout(() => {
            button.textContent =
                "COPY";
        }, 1600);
    }
}

contactTriggers.forEach((trigger) => {
    trigger.addEventListener(
        "click",
        (event) => {
            event.preventDefault();

            const type =
                trigger.getAttribute(
                    "data-contact"
                );

            if (!type) {
                return;
            }

            createContactPopup(
                type
            );
        }
    );
});

if (
    !isTouchDevice &&
    !prefersReducedMotion
) {
    magneticElements.forEach(
        (element) => {
            element.addEventListener(
                "pointermove",
                (event) => {
                    const rect =
                        element.getBoundingClientRect();

                    const x =
                        event.clientX -
                        rect.left -
                        rect.width / 2;

                    const y =
                        event.clientY -
                        rect.top -
                        rect.height / 2;

                    element.style.transform =
                        `translate3d(${x * 0.08}px, ${y * 0.08}px, 0)`;
                },
                {
                    passive: true
                }
            );

            element.addEventListener(
                "pointerleave",
                () => {
                    element.style.transform =
                        "";
                }
            );
        }
    );
}

function escapeHTML(value) {
    const element =
        document.createElement(
            "div"
        );

    element.textContent =
        value;

    return element.innerHTML;
}

function getTerminalElements() {
    return {
        terminal:
            document.querySelector(
                "[data-terminal]"
            ),

        output:
            document.querySelector(
                "[data-terminal-output]"
            ),

        form:
            document.querySelector(
                "[data-terminal-form]"
            ),

        input:
            document.querySelector(
                "[data-terminal-input]"
            )
    };
}

const terminalCommands = {
    help: {
        description:
            "Display available commands.",

        run: () => [
            "AVAILABLE COMMANDS",
            "",
            "help      — display this command list",
            "about     — about Mayon",
            "projects  — view selected projects",
            "skills    — view capabilities",
            "live      — view live system",
            "contact   — open contact interface",
            "github    — show GitHub contact",
            "discord   — show Discord contact",
            "clear     — clear terminal output"
        ]
    },

    him: {
        description: "ahm....",
         run: () => {
        const target =
            document.querySelector("#contact");

        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });
        }

        return [
            "Absolute perfection",
            "",
            "ahm..dont dare to leak this",
            "he is perfect man...just perfect",
            "like no words to describe him",
            "he is the best man i have ever seen",
            "more addicting than anythinggg...",
                ];
    }
},

    woof: {
        description:
           "ahm.",
        run: () => {
        const target =
            document.querySelector("#contact");

        if (target) {
            target.scrollIntoView({
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth",
                block: "start"
            });
        }

        return [
            "awww..cutie",
            "",
            "you r a good boy",
            "I am happy with youuu",
        ];
    }
},

    about: {
        description:
            "Display information about Mayon.",

        run: () => [
            "Abt me???",
            "",
            " Beside a game server developer, hosting manager,",
            "server optimizer, and infrastructure builder",
            "I am a smart guy...ppl say",
            "but sometimes world feels uselss..",
            "i like tech things & hardwares too too much",
            "ngl i don't know who are u reading or why r u?",
            "but ye..its very glad full to see",
            "",
            "",
            "Focus: Un-Focused",
            "Approach: you can",
            "Environment: LUKEWARM, PATHETIC, DISGUSTING",
            "Status: BURN OUT. DEPRESSED. DISGUESTED"
        ]
    },

    projects: {
        description:
            "Display selected projects.",

        run: () => [
            "SELECTED WORK",
            "",
            "01 / NOTDEV STUDIOS",
            "Minecraft game server and plugin development.",
            "",
            "02 / BLOODLINESMP",
            "Paper plugin development and custom gameplay systems.",
            "",
            "03 / OPEXIM STUDIO",
            "Game server development and infrastructure.",
            "",
            "04 / SERVER INFRASTRUCTURE",
            "Hosting, deployment, optimization, and management."
        ]
    },

    skills: {
        description:
            "Display technical capabilities.",

        run: () => [
            "CAPABILITIES",
            "",
            "GAME SERVER DEVELOPMENT",
            "SERVER SYSTEMS / GAMEPLAY FEATURES / CONFIGURATION / PLUGINS",
            "",
            "HOSTING MANAGEMENT",
            "HOSTING / RESOURCES / DEPLOYMENTS / OPERATIONS",
            "",
            "OPTIMIZATION",
            "PERFORMANCE / RESOURCES / MONITORING / TROUBLESHOOTING",
            "",
            "INFRASTRUCTURE",
            "LINUX / NETWORKING / ADMINISTRATION / INFRASTRUCTURE"
        ]
    },

    live: {
        description:
            "Jump to live system.",

        run: () => {
            const target =
                document.querySelector(
                    "#live"
                );

            if (target) {
                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });
            }

            return [
                "LIVE SYSTEM",
                "",
                "Opening real-time Discord presence..."
            ];
        }
    },

    contact: {
        description:
            "Open contact interface.",

        run: () => {
            const target =
                document.querySelector(
                    "#contact"
                );

            if (target) {
                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });
            }

            return [
                "CONTACT",
                "",
                "Contact interface opened.",
                "Use the available contact controls below."
            ];
        }
    },

    github: {
        description:
            "Display GitHub contact.",

        run: () => {
            createContactPopup(
                "github"
            );

            return [
                "GITHUB",
                "",
                CONTACT.github,
                "",
                "Opening contact interface..."
            ];
        }
    },

    discord: {
        description:
            "Display Discord contact.",

        run: () => {
            createContactPopup(
                "discord"
            );

            return [
                "DISCORD",
                "",
                CONTACT.discord,
                "",
                "Opening contact interface..."
            ];
        }
    },

    clear: {
        description:
            "Clear terminal output.",

        run: () => null
    }
};

function terminalPrint(
    output,
    lines,
    type = "system"
) {
    if (!output) {
        return;
    }

    lines.forEach((line) => {
        const element =
            document.createElement(
                "div"
            );

        element.className =
            `terminal-line terminal-line--${type}`;

        if (line === "") {
            element.innerHTML =
                "&nbsp;";
        } else {
            element.textContent =
                line;
        }

        output.appendChild(
            element
        );
    });

    output.scrollTop =
        output.scrollHeight;
}

function terminalExecute(command) {
    const { output, input } = getTerminalElements();

    if (!output || typeof command !== "string") return;

    const normalized = command.trim().toLowerCase();
    if (!normalized) return;

    const pageX = window.scrollX;
    const pageY = window.scrollY;

    terminalPrint(output, [`> ${command}`], "command");

    const commandName = normalized.split(/\s+/)[0];
    const commandDefinition = Object.prototype.hasOwnProperty.call(terminalCommands, commandName)
        ? terminalCommands[commandName]
        : null;

    if (!commandDefinition) {
        terminalPrint(output, [
            `COMMAND NOT FOUND: ${normalized}`,
            "Type help to view available commands."
        ], "error");
        restoreTerminalScroll(pageX, pageY, input);
        return;
    }

    try {
        const result = commandDefinition.run();

        if (commandName === "clear") {
            output.replaceChildren();
            terminalPrint(output, [
                "MAYON SYSTEM TERMINAL / ONLINE",
                "Terminal cleared.",
                "Type help to see available commands."
            ], "system");
        } else if (Array.isArray(result)) {
            terminalPrint(output, result, "response");
        }
    } catch (error) {
        console.error("Portfolio terminal command failed:", error);
        terminalPrint(output, [
            "COMMAND ERROR: this command could not be completed.",
            "Check the browser console for details."
        ], "error");
    }

    restoreTerminalScroll(pageX, pageY, input);
}

function restoreTerminalScroll(
    pageX,
    pageY,
    input
) {
    if (input) {
        input.focus({
            preventScroll: true
        });
    }

    window.scrollTo({
        left: pageX,
        top: pageY,
        behavior: "auto"
    });

    requestAnimationFrame(() => {
        window.scrollTo({
            left: pageX,
            top: pageY,
            behavior: "auto"
        });
    });
}

function initializeTerminal() {
    const { terminal, output, form, input } = getTerminalElements();

    if (
        !terminal ||
        !output ||
        !form ||
        !input
    ) {
        return;
    }

    if (form.dataset.terminalInitialized === "true") return;
    form.dataset.terminalInitialized = "true";

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        event.stopPropagation();

        const command = input.value;
        if (!command.trim()) return;

        terminalExecute(command);
        input.value = "";
    });

    input.addEventListener(
        "keydown",
        (event) => {
            if (
                event.key === "Escape"
            ) {
                input.value = "";
            }
        }
    );

    terminal.addEventListener(
        "click",
        (event) => {
            const target =
                event.target;

            if (
                target === input ||
                target.closest(
                    "button, a"
                )
            ) {
                return;
            }

            input.focus({
                preventScroll: true
            });
        }
    );
}

initializeTerminal();

(() => {
    const root = document.querySelector("[data-lanyard]");

    if (!root) {
        return;
    }

    const ENDPOINTS = [
        LANYARD_API_URL,
        `https://api.lanyard.rest/v1/users/${LANYARD_USER_ID}`
    ];

    const SOCKET_URL = "wss://api.lanyard.rest/socket";
    const POLL_MS = 8000;
    const POLL_MAX_MS = 60000;
    const REQUEST_TIMEOUT_MS = 6000;
    const VSCODE_APP_ID = "383226320970055681";
    const VSCODE_NAME =
        /visual studio code|vscodium|code - oss|^vs ?code|^cursor$|^windsurf$/i;

    const q = (selector) => document.querySelector(selector);

    const el = {
        avatar: q("[data-lanyard-avatar]"),
        name: q("[data-lanyard-name]"),
        username: q("[data-lanyard-username]"),
        headerStatus: q("[data-lanyard-status]"),
        status: q("[data-lanyard-discord-status]"),
        activity: q("[data-lanyard-activity]"),
        device: q("[data-lanyard-device]"),
        spotify: q("[data-lanyard-spotify]"),
        dot: q("[data-lanyard-dot]"),
        updated: q("[data-lanyard-updated]"),
        spotifyCard: q("[data-lanyard-spotify-card]"),
        spotifyArt: q("[data-lanyard-spotify-art]"),
        spotifySong: q("[data-lanyard-spotify-song]"),
        spotifyArtist: q("[data-lanyard-spotify-artist]"),
        spotifyTime: q("[data-lanyard-spotify-time]"),
        spotifyProgress: q("[data-lanyard-spotify-progress]"),
        codeState: q("[data-lanyard-code-state]"),
        codeIcon: q("[data-lanyard-code-icon]"),
        codeGlyph: q("[data-lanyard-code-glyph]"),
        codeFile: q("[data-lanyard-code-file]"),
        codeWorkspace: q("[data-lanyard-code-workspace]"),
        codeElapsed: q("[data-lanyard-code-elapsed]")
    };

    const state = {
        payload: null,
        mode: "connecting",
        spotifyRange: null,
        codeStart: null,
        failures: 0,
        pollTimer: null,
        socket: null,
        socketTimer: null,
        socketDelay: 2000,
        heartbeat: null
    };

    root.dataset.presence = "connecting";
    root.dataset.coding = "none";

    function setText(node, value) {
        if (!node || node.textContent === value) {
            return;
        }

        const seen = node.dataset.ready === "1";

        node.textContent = value;
        node.dataset.ready = "1";

        if (seen && !prefersReducedMotion) {
            node.classList.remove("is-updated");
            void node.offsetWidth;
            node.classList.add("is-updated");

            node.addEventListener(
                "animationend",
                () => node.classList.remove("is-updated"),
                { once: true }
            );
        }
    }

    function setAttr(node, name, value) {
        if (node && node.getAttribute(name) !== value) {
            node.setAttribute(name, value);
        }
    }

    function pad(n) {
        return String(n).padStart(2, "0");
    }

    function formatElapsed(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));
        const h = Math.floor(total / 3600);
        const m = Math.floor((total % 3600) / 60);
        const s = total % 60;

        return `${pad(h)}:${pad(m)}:${pad(s)}`;
    }

    function formatClock(ms) {
        const total = Math.max(0, Math.floor(ms / 1000));

        return `${Math.floor(total / 60)}:${pad(total % 60)}`;
    }

    function assetUrl(image, appId) {
        if (!image) {
            return "";
        }

        if (image.startsWith("mp:external/")) {
            return `https://media.discordapp.net/external/${image.slice(12)}`;
        }

        if (image.startsWith("mp:")) {
            return `https://media.discordapp.net/${image.slice(3)}`;
        }

        if (/^https?:\/\//.test(image)) {
            return image;
        }

        return appId
            ? `https://cdn.discordapp.com/app-assets/${appId}/${image}.png`
            : "";
    }

    function isCodeActivity(item) {
        return (
            item &&
            item.type === 0 &&
            (item.application_id === VSCODE_APP_ID ||
                VSCODE_NAME.test(item.name || ""))
        );
    }

    function renderCode(activity) {
        if (!activity) {
            root.dataset.coding = "none";
            state.codeStart = null;

            setText(el.codeState, "NOT CODING");
            setText(el.codeFile, "No active session");
            setText(el.codeWorkspace, "—");
            setText(el.codeElapsed, "--:--:--");

            if (el.codeIcon) {
                el.codeIcon.hidden = true;
            }

            if (el.codeGlyph) {
                el.codeGlyph.hidden = false;
            }

            return;
        }

        const details = activity.details || "Working";
        const idle = /idl/i.test(details);
        const workspace =
            activity.state ||
            (activity.assets && activity.assets.large_text) ||
            "—";

        root.dataset.coding = idle ? "idle" : "active";
        state.codeStart =
            (activity.timestamps && activity.timestamps.start) || null;

        setText(el.codeState, idle ? "IDLE" : "CODING");
        setText(el.codeFile, details);
        setText(el.codeWorkspace, workspace);

        const icon = assetUrl(
            activity.assets && activity.assets.large_image,
            activity.application_id
        );

        if (el.codeIcon && icon) {
            if (el.codeIcon.getAttribute("src") !== icon) {
                el.codeIcon.src = icon;
            }

            el.codeIcon.alt =
                (activity.assets && activity.assets.large_text) || "";
            el.codeIcon.hidden = false;

            if (el.codeGlyph) {
                el.codeGlyph.hidden = true;
            }
        } else {
            if (el.codeIcon) {
                el.codeIcon.hidden = true;
            }

            if (el.codeGlyph) {
                el.codeGlyph.hidden = false;
            }
        }

        tick();
    }

    function renderSpotify(spotify) {
        const playing = Boolean(spotify);

        setText(el.spotify, playing ? "PLAYING" : "NOT PLAYING");

        if (el.spotifyCard) {
            el.spotifyCard.hidden = !playing;
        }

        if (!playing) {
            state.spotifyRange = null;
            return;
        }

        setText(el.spotifySong, spotify.song || "—");
        setText(el.spotifyArtist, spotify.artist || "—");

        if (el.spotifyArt) {
            const art = spotify.album_art_url || "";

            if (art && el.spotifyArt.getAttribute("src") !== art) {
                el.spotifyArt.src = art;
            }

            el.spotifyArt.alt = spotify.album || "Spotify artwork";
        }

        const t = spotify.timestamps;

        state.spotifyRange =
            t && t.start && t.end ? { start: t.start, end: t.end } : null;

        tick();
    }

    function render(payload) {
        state.payload = payload;
        state.failures = 0;

        const user = payload.discord_user || {};
        const presence = payload.discord_status || "offline";
        const activities = Array.isArray(payload.activities)
            ? payload.activities
            : [];

        root.dataset.presence = presence;

        if (el.avatar && user.avatar) {
            const ext = user.avatar.startsWith("a_") ? "gif" : "png";
            const url = `https://cdn.discordapp.com/avatars/${LANYARD_USER_ID}/${user.avatar}.${ext}?size=128`;

            if (el.avatar.getAttribute("src") !== url) {
                el.avatar.src = url;
            }
        }

        setText(
            el.name,
            (user.global_name || user.username || "MAYON").toUpperCase()
        );

        if (user.username) {
            setText(el.username, `@${user.username}`);
        }

        const label =
            presence === "dnd" ? "DO NOT DISTURB" : presence.toUpperCase();

        setText(el.headerStatus, label);
        setText(el.status, label);

        const shown = activities.find(
            (item) => item.type !== 2 && item.type !== 4
        );

        setText(
            el.activity,
            shown && shown.name ? shown.name.toUpperCase() : "NONE"
        );

        const devices = [];

        if (payload.active_on_discord_desktop) devices.push("DESKTOP");
        if (payload.active_on_discord_web) devices.push("WEB");
        if (payload.active_on_discord_mobile) devices.push("MOBILE");

        setText(el.device, devices.length ? devices.join(" + ") : "UNKNOWN");

        renderCode(activities.find(isCodeActivity));

        renderSpotify(
            payload.spotify && payload.listening_to_spotify !== false
                ? payload.spotify
                : null
        );

        setAttr(el.dot, "data-status", presence);

        const stamp = new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        });

        setText(
            el.updated,
            state.mode === "live" ? `LIVE ${stamp}` : `SYNCED ${stamp}`
        );
    }

    function renderOffline(message) {
        root.dataset.presence = "offline";
        root.dataset.coding = "none";

        setText(el.headerStatus, "OFFLINE");
        setText(el.status, "OFFLINE");
        setText(el.activity, "NONE");
        setText(el.device, "UNKNOWN");
        setText(el.spotify, "NOT PLAYING");
        setText(el.updated, message);
        setAttr(el.dot, "data-status", "offline");

        if (el.spotifyCard) {
            el.spotifyCard.hidden = true;
        }

        renderCode(null);
    }

    function handleFailure(message) {
        state.failures += 1;

        if (state.payload) {

            setText(el.updated, "RECONNECTING");
            return;
        }

        renderOffline(message || "CONNECTION UNAVAILABLE");
    }

    function tick() {
        if (document.hidden) {
            return;
        }

        const now = Date.now();

        if (state.codeStart && root.dataset.coding !== "none") {
            setText(el.codeElapsed, formatElapsed(now - state.codeStart));
        }

        const range = state.spotifyRange;

        if (range) {
            const length = range.end - range.start;
            const done = Math.min(Math.max(now - range.start, 0), length);

            if (el.spotifyProgress) {
                el.spotifyProgress.style.width = `${(done / length) * 100}%`;
            }

            setText(
                el.spotifyTime,
                `${formatClock(done)} / ${formatClock(length)}`
            );
        }
    }

    window.setInterval(tick, 1000);

    let preferred = 0;

    async function fetchJson(url) {
        const controller = new AbortController();
        const timer = window.setTimeout(
            () => controller.abort(),
            REQUEST_TIMEOUT_MS
        );

        try {
            const response = await fetch(url, {
                method: "GET",
                cache: "no-store",
                headers: { Accept: "application/json" },
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            return await response.json();
        } finally {
            window.clearTimeout(timer);
        }
    }

    async function pollOnce() {
        let notTracked = false;

        for (let i = 0; i < ENDPOINTS.length; i += 1) {
            const index = (preferred + i) % ENDPOINTS.length;

            try {
                const json = await fetchJson(ENDPOINTS[index]);

                if (json && json.success && json.data) {
                    preferred = index;

                    if (state.mode !== "live") {
                        state.mode = "poll";
                    }

                    render(json.data);
                    return true;
                }

                if (json && json.success === false) {
                    notTracked = true;
                }
            } catch {

            }
        }

        handleFailure(notTracked ? "USER NOT TRACKED" : "CONNECTION UNAVAILABLE");
        return false;
    }

    function schedulePoll(delay) {
        window.clearTimeout(state.pollTimer);
        state.pollTimer = window.setTimeout(poll, delay);
    }

    async function poll() {
        if (document.hidden || state.mode === "live") {
            schedulePoll(state.mode === "live" ? 30000 : POLL_MS);
            return;
        }

        const ok = await pollOnce();

        schedulePoll(
            ok
                ? POLL_MS
                : Math.min(POLL_MS * 2 ** state.failures, POLL_MAX_MS)
        );
    }

    function closeSocketState() {
        window.clearInterval(state.heartbeat);
        state.socket = null;

        if (state.mode === "live") {
            state.mode = "poll";
        }

        window.clearTimeout(state.socketTimer);
        state.socketTimer = window.setTimeout(
            connectSocket,
            state.socketDelay
        );
        state.socketDelay = Math.min(state.socketDelay * 2, 60000);

        schedulePoll(1000);
    }

    function connectSocket() {
        if (state.socket || typeof WebSocket === "undefined") {
            return;
        }

        let ws;

        try {
            ws = new WebSocket(SOCKET_URL);
        } catch {
            return;
        }

        state.socket = ws;

        ws.addEventListener("message", (event) => {
            let message;

            try {
                message = JSON.parse(event.data);
            } catch {
                return;
            }

            if (message.op === 1) {
                ws.send(
                    JSON.stringify({
                        op: 2,
                        d: { subscribe_to_id: LANYARD_USER_ID }
                    })
                );

                window.clearInterval(state.heartbeat);
                state.heartbeat = window.setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(JSON.stringify({ op: 3 }));
                    }
                }, (message.d && message.d.heartbeat_interval) || 30000);

                return;
            }

            if (
                message.op === 0 &&
                message.d &&
                (message.t === "INIT_STATE" ||
                    message.t === "PRESENCE_UPDATE")
            ) {
                state.mode = "live";
                state.socketDelay = 2000;
                render(message.d);
            }
        });

        ws.addEventListener("close", closeSocketState);
        ws.addEventListener("error", () => ws.close());
    }

    if (el.avatar) {
        el.avatar.addEventListener("error", () => {
            if (!el.avatar.dataset.fallback) {
                el.avatar.dataset.fallback = "1";
                el.avatar.src = `https://api.lanyard.rest/${LANYARD_USER_ID}.png`;
            }
        });
    }

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            tick();

            if (state.mode !== "live") {
                schedulePoll(0);
            }
        }
    });

    window.addEventListener("online", () => {
        state.socketDelay = 2000;
        connectSocket();
        schedulePoll(0);
    });

    setText(el.headerStatus, "CONNECTING");
    poll();
    connectSocket();
})();

if (prefersReducedMotion) {
    document.documentElement.classList.add(
        "reduced-motion"
    );
}

if (isTouchDevice) {
    document.documentElement.classList.add(
        "touch-device"
    );
}
