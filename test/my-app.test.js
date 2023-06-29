import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/components/my-app.js';

describe('MyApp', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<my-app></my-app>`);
  });

  it('renders a header', () => {
    const el = element.shadowRoot.querySelector('mwc-top-app-bar');
    expect(el).to.exist;
    expect(el.textContent).to.exist;
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
