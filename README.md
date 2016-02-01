# React Template Helpers

Template helpers for easier map logic and if statements in your React components.

We all like stateless React Components, they have made it easier thinking about separating your looks from your logic, but for true bliss and future platforms to use these we need to start thinking about them as templates for markup. And expose them for others to make the life using and extending your package or module easier, and with this module also a bit more readable.

Don't miss the announcing article of this method on medium: [How to write Templates for React](http://medium.com/timbrandin/...).

## Templates

Most module developers already knows that for a package or module to become successful one has to enable for customizing it, as one can never fully know how it will be used. And the method to enable this fully is to separate your components in two parts, one part stateless component that we'll start calling the template, and one part the State-Full Component that will handle events, data and logic. The only way we can accomplish is if we all use the same object we're we are assigning our templates on, from here anyone using your package can easily re-implement that template and take control of the markup and extend for the use-case in their application.

In this example we import the extendable Template object and assign our stateless component for the layout.

```jsx
import Template from 'react-template-helpers';

Template.Layout = ({content}) => (
  <div>
    <h1>My App</h1>
    <hr />
    <div>{content}</div>
  </div>
);
```

Then in another file, module or package that is loaded to the app after the previous template, can now override the layout by re-implementing that component:

```jsx
import Template from 'react-template-helpers';

Template.Layout = ({content}) => (
  <div>
    <h1>My App version 2</h1>
    <hr />
    <div>{content}</div>
  </div>
);
```

## Template Helpers

A module called template helpers would seem very empty if shipped with only the Template extendable object, so here I give you two helpers that will clear up some logic in your components, and make life a little easier.

### each

To simplify and help you clean up components, we start with first getting rid of Array.map that we previously used everywhere in React, but had to hack to get working for Objects. The lightweight helper `each` works for both Objects and Arrays and also provides a useful numeric index.

The basic usage of `each` below, demonstrates how a stateless component using ES2015 can be cleared up. In this example we list the name and role (the parameter key) of all people in the object passed to the template.

```jsx
import {Template, each} from 'react-template-helpers';

Template.People = ({ name, people }) => (
  <div>
    {each(people, (person, role, index) =>
      <div key={index}>{role}: {person.name}</div>
    )}
  </div>
);
```

If the list of people was empty we can show a block in place that describes this for the user, as the example below demonstrates.

```jsx
import {Template, each} from 'react-template-helpers';

Template.People = ({ name, people }) => (
  <div>
    {each(people, (person, role, index) =>
      <div key={index}>{role}: {person.name}</div>
    ).else(
      <div>No people</div>
    )}
  </div>
);
```

Notice the third argument to the iteratee if provides both the item, key and a numerical index from the Array or Object, which can used to enable for example striping in tables with odd/even classes:

```jsx
import {Template, each} from 'react-template-helpers';

Template.StripedTable = ({ people, docs }) => (
  <table>
    <thead>
      <tr>
        <th>Role</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {each(people, (person, role, index) =>
        <tr className={ index % 2 ? 'even' : 'odd' }  
          key={index}>
          <td>{role}</td>
          <td>{person.name}</td>
        </tr>
      )}
    </tbody>
  </table>
);
```

Or a first/last class which could be useful for example in a menu, notice the
use of the fourth argument passed to the iteratee that returns the max numerical
index for the object or array passed to `each`.

```jsx
import {Template, each} from 'react-template-helpers';

Template.Menu = ({ menuItems }) => {
  return (<ul className="menu">
      {each(menuItems, (item, key, i, max) =>
        <tr className={ (i == 0 ? 'first' : (i == max ? 'last' : '') }  
          key={key}>
          <td>{role}</td>
          <td>{person.name}</td>
        </tr>
      )}
    </ul>);
};
```

### when

To simplify and help you clean up your code, use `when` to get rid of inline if
statements that only reduce readability, and gain a method for clear template syntax.

A simple usage of when here is to type out if the passed argument name was exactly `timbrandin` or not.

```jsx
import {Template, when} from 'react-template-helpers';

Template.IsItTim = ({ name }) => (
  <div>
    {when(name == 'timbrandin',
      <div>Name is timbrandin</div>
    ).else(
      <div>Name is not timbrandin</div>
    )}
  </div>
);
```
