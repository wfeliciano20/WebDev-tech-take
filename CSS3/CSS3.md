# CSS3

You can write CSS3 in various places you could do it inline in the HTML element or you can write it in between the style tags or you can have the CSS3 content in a separate file and link to it in the HTML head tag.

There are many selectors that select all of the html elements of that specified selector.
An example of this is:

```css

this is the selector ->a {

<!-- CSS3 code here -->

}

```

But this is not the only way to select html tags the other two ways are by assigning an id to the tag which will be unique or by assigning a class to the tag which can be reuse multiple times.

By using this selectors you can change many properties of the HTML element that was selected such as the font color size and family but also you can also manage the positioning of the element itself and even animations.

## CSS VARIABLES

You can also have CSS variables which have the following syntax:

**-- variable-name:value;**

To use this variables you will need the following syntax:

**atribute: var(--variable-name, fallback value);**

ex.
background:var(--penguin-skin, black);
this syntax will mean that the browser will try to make the background of the html element to the variable --penguin-skin but if it does not find it,the color that will be use is the fallback value which in this example is the color black;

## CSS VARIABLES INHERIT

When you create a variable, it is available for you to use inside the selector in which you create it. It also is available in any of that selector's descendants. This happens because CSS variables are inherited, just like ordinary properties.

To make use of inheritance, CSS variables are often defined in the :root element.

**:root** is a pseudo-class selector that matches the root element of the document, usually the html element. By creating your variables in :root, they will be available globally and can be accessed from any other selector in the style sheet.

## CSS ALIGNMENT

Text is often a large part of web content. CSS has several options for how to align it with the text-align property.

text-align: justify; causes all lines of text except the last line to meet the left and right edges of the line box.

text-align: center; centers the text

text-align: right; right-aligns the text

And text-align: left; (the default) left-aligns the text.

## PSEUDO CLASsES

A pseudo-class is a keyword that can be added to selectors, in order to select a specific state of the element.

example:

```css

a:hover {
color:red;
}

```

