import { html } from 'lit';
import '../src/my-app.js';

export default {
  title: 'MyApp',
  component: 'my-app',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ title, backgroundColor }) {
  return html`
    <my-app
      style="--my-app-background-color: ${backgroundColor || 'white'}"
      .title=${title}
    >
    </my-app>
  `;
}

export const App = Template.bind({});
App.args = {
  title: 'My app',
};
