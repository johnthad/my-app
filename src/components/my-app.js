import { LitElement, html, css } from 'lit';
import { connect } from 'pwa-helpers/connect-mixin.js';
import { installMediaQueryWatcher } from 'pwa-helpers/media-query.js';
import { installOfflineWatcher } from 'pwa-helpers/network.js';
import { installRouter } from 'pwa-helpers/router.js';
import { updateMetadata } from 'pwa-helpers/metadata.js';

// This element is connected to the Redux store.
import { store } from '../store.js';

// These are the actions needed by this element.
import { navigate, updateOffline, updateDrawerState } from '../actions/app.js';

import '@material/mwc-drawer';
import '@material/mwc-top-app-bar';

import { menuIcon } from './my-icons.js';
import './snack-bar.js';

export class MyApp extends connect(store)(LitElement) {
  static get properties() {
    return {
      appTitle: { type: String },
      _page: { type: String },
      _drawerOpened: { type: Boolean },
      _snackbarOpened: { type: Boolean },
      _offline: { type: Boolean },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;

        --app-primary-color: #e91e63;
        --app-secondary-color: #293237;
        --app-dark-text-color: var(--app-secondary-color);
        --app-light-text-color: white;
        --app-section-even-color: #f7f7f7;
        --app-section-odd-color: white;

        --app-header-background-color: white;
        --app-header-text-color: var(--app-dark-text-color);
        --app-header-selected-color: var(--app-primary-color);

        --app-drawer-background-color: var(--app-secondary-color);
        --app-drawer-text-color: var(--app-light-text-color);
        --app-drawer-selected-color: #78909c;
      }

      mwc-top-app-bar {
        display: block;
        --mdc-theme-primary: none;
        --mdc-theme-on-primary: black;
      }

      .toolbar-top {
        background-color: var(--app-header-background-color);
      }

      [main-title] {
        /* position: fixed; */
        top: 0;
        left: 0;
        width: 100%;
        height: 48px;
        font-family: 'Pacifico';
        text-transform: lowercase;
        font-size: 30px;
        /* In the narrow layout, the toolbar is offset by the width of the
        drawer button, and the text looks not centered. Add a padding to
        match that button */
        padding-right: 44px;
        text-align: center;
      }

      .toolbar-list {
        display: none;
        text-align: center;
      }

      .toolbar-list > a {
        display: inline-block;
        color: var(--app-header-text-color);
        text-decoration: none;
        line-height: 30px;
        padding: 4px 24px;
      }

      .toolbar-list > a[selected] {
        color: var(--app-header-selected-color);
        border-bottom: 4px solid var(--app-header-selected-color);
      }

      .menu-btn {
        background: none;
        border: none;
        fill: var(--app-header-text-color);
        cursor: pointer;
        height: 44px;
        width: 44px;
      }

      .drawer-list {
        box-sizing: border-box;
        width: 256px;
        height: 100vh;
        padding: 24px;
        background: var(--app-drawer-background-color);
        position: relative;
      }

      .drawer-list > a {
        display: block;
        text-decoration: none;
        color: var(--app-drawer-text-color);
        line-height: 40px;
        padding: 0 24px;
      }

      .drawer-list > a[selected] {
        color: var(--app-drawer-selected-color);
      }

      /* Workaround for IE11 displaying <main> as inline */
      main {
        display: block;
      }

      .main-content {
        margin-top: -12px;
        min-height: 100vh;
      }

      .page {
        display: none;
      }

      .page[active] {
        display: block;
      }

      footer {
        padding: 24px;
        background: var(--app-drawer-background-color);
        color: var(--app-drawer-text-color);
        text-align: center;
      }

      /* Wide layout: when the viewport width is bigger than 460px, layout
      changes to a wide layout */
      @media screen and (min-width: 460px) {
        .toolbar-list {
          display: block;
        }

        .menu-btn {
          display: none;
        }

        .main-content {
          margin-top: -7px;
        }

        /* The drawer button isn't shown in the wide layout, so we don't
        need to offset the title */
        [main-title] {
          padding-right: 0px;
        }
      }
    `;
  }

  render() {
    return html`
      <mwc-top-app-bar class="toolbar-top" centerTitle dense>
        <button
          slot="navigationIcon"
          class="menu-btn"
          title="Menu"
          @click="${this._menuButtonClicked}"
        >
          ${menuIcon}
        </button>
        <div slot="title" main-title>${this.appTitle}</div>

        <!-- This gets hidden on a small screen-->
        <nav class="toolbar-list">
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>
      </mwc-top-app-bar>

      <!-- Drawer content -->
      <mwc-drawer
        type="modal"
        .open="${this._drawerOpened}"
        @MDCDrawer:opened="${this._menuButtonClicked}"
        @MDCDrawer:closed="${this._menuButtonClicked}"
      >
        <nav class="drawer-list">
          <a ?selected="${this._page === 'view1'}" href="/view1">View One</a>
          <a ?selected="${this._page === 'view2'}" href="/view2">View Two</a>
          <a ?selected="${this._page === 'view3'}" href="/view3">View Three</a>
        </nav>
      </mwc-drawer>

      <!-- Main content -->
      <main role="main" class="main-content">
        <my-view1 class="page" ?active="${this._page === 'view1'}"></my-view1>
        <my-view2 class="page" ?active="${this._page === 'view2'}"></my-view2>
        <my-view3 class="page" ?active="${this._page === 'view3'}"></my-view3>
        <my-view404
          class="page"
          ?active="${this._page === 'view404'}"
        ></my-view404>
      </main>

      <footer>
        <p>Adapted from a project by the Polymer team.</p>
      </footer>

      <snack-bar ?active="${this._snackbarOpened}">
        You are now ${this._offline ? 'offline' : 'online'}.
      </snack-bar>
    `;
  }

  constructor() {
    super();
    this._drawerOpened = true;
  }

  firstUpdated() {
    installRouter(location => store.dispatch(navigate(location)));
    installOfflineWatcher(offline => store.dispatch(updateOffline(offline)));
    installMediaQueryWatcher(`(min-width: 460px)`, () =>
      store.dispatch(updateDrawerState(false)),
    );
  }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageTitle = `${this.appTitle} - ${this._page}`;
      updateMetadata({
        title: pageTitle,
        description: pageTitle,
        image: 'images/manifest/icon-144x144.png',
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  _menuButtonClicked() {
    store.dispatch(updateDrawerState(true));
  }

  // eslint-disable-next-line class-methods-use-this
  _drawerOpenedChanged(e) {
    store.dispatch(updateDrawerState(e.target.opened));
  }

  stateChanged(state) {
    this._page = state.app.page;
    this._offline = state.app.offline;
    this._snackbarOpened = state.app.snackbarOpened;
    this._drawerOpened = state.app.drawerOpened;
  }
}

window.customElements.define('my-app', MyApp);
