/**
 * Code here is pure javascript to minimize
 * the use of other plugin and other dependencies
 */
class ShowSessionTimeoutModal {
    static execute() {
        // prevent from multiple append
        if (window.document.querySelector('div.session-expired')) {
            return;
        }
        this.createSessionExpiredModal();
        this.createSessionExpiredStyle();
        window.document.body.style.overflow = 'hidden';

        this.reloadPage();
    }

    static createSessionExpiredModal() {
        let div = window.document.createElement('div');
        let sessionExpiredElement =
            `
            <div class="session-expired__container">
                <div class="session-expired__wrapper">
                    <span class="session-expired__text">Session Expired, page will automatically reload.</span>
                </div>
            </div>
            `;

        div.innerHTML = sessionExpiredElement.trim();
        div.classList.add('session-expired');

        window.document.body.appendChild(div);
    }

    static createSessionExpiredStyle() {
        let style = document.createElement('style');
        let css =
            `
            .session-expired {
                background-color: #0000009c;
                bottom: 0;
                left: 0;
                position: fixed;
                right: 0;
                top: 0;
                z-index: 9999;
            }
            
            .session-expired__container {
                display: table;
                height: 100%;
                width: 100%;
            }
            
            .session-expired__wrapper {
                display: table-cell;
                text-align: center;
                vertical-align: middle;
            }
            
            .session-expired__text {
                background: #0070fff0;
                border-radius: 2px;
                color: #fff;
                font-size: 18px;
                padding: 18px;
            }
            `;
        style.type = 'text/css';
        style.appendChild(document.createTextNode(css.trim()));

        window.document.head.appendChild(style);
    }

    static reloadPage() {
        setTimeout(() => {
            window.location = '/login';
        }, 1500);
    }
}

export function showSessionTimeout() {
    ShowSessionTimeoutModal.execute();
}
