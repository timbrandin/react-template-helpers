# React Template Helpers

React Template helpers for easier map, if and unless statements.

Basically I like Stateless React Components, and I thought I could make the life using them and extending others' easier and more readable.

Don't miss to read my article about this:

## Templates

Templates need to be global to enable overrides from other modules or your application.

For example one module, package or file implements templates like this:

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

Then any other module, package or file can override it by re-implement that template:

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

And this works thanks to that we're all using the same template system 'react-template-helpers' that has an extendable object that anyone using this module can use.

> Notice! This will work correctly if the load order is in the order you expect it, but generally if you use a module or package in your app that uses this, you're allowed to override it.

## Template Helpers

So this package would seem very empty if shipped with only the Template extendable object, so here's some helpers to make life a little easier.

### each

To simplify and help you clean up we get rid of Array.map function that was used everywhere in React, and which also doesn't work on Objects. Each works for both Objects and Arrays and is really lightweight (see for yourself in src/index.js and have a look at the implementation).

The basic usage of each, is demonstrated best below in the stateless component using ES2015. Here we list the name and role (as the object key) of all people in the Object.

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

It also gives you else-blocks if the Object or Array was empty.

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

Notice the third argument to the you get both the key and the index from the Array or Object, that is to enable such things as striping in tables or odd/even classes in your lists, like this:

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

### when

To simplify and help you clean up your code, we use `when` to get rid of inline if statements
that only reduces readability, especially for anyone other than you who later want to help to use and extend your component with some other markup.

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
