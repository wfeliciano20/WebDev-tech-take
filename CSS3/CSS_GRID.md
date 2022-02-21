# CSS GRID

Turn any HTML element into a grid container by setting its display property to grid. This gives you the ability to use all the other properties associated with CSS Grid.

Note: In CSS Grid, the parent element is referred to as the container and its children are called items.

## GRID TEMPLATE COLUMNS

Simply creating a grid element doesn't get you very far. You need to define the structure of the grid as well. To add some columns to the grid, use the grid-template-columns property on a grid container as demonstrated below:

'''css

.container {
display: grid;
grid-template-columns: 50px 50px;
}

'''

This will give your grid two columns that are each 50px wide. The number of parameters given to the grid-template-columns property indicates the number of columns in the grid, and the value of each parameter indicates the width of each column.

## GRID TEMPLATE ROWS

To adjust the rows manually, use the grid-template-rows property in the same way you used grid-template-columns.

## GRID UNITS

You can use absolute and relative units like px and em in CSS Grid to define the size of rows and columns. You can use these as well:

fr: sets the column or row to a fraction of the available space,

auto: sets the column or row to the width or height of its content automatically,

%: adjusts the column or row to the percent width of its container.

Here's the code that generates the output in the preview:

grid-template-columns: auto 50px 10% 2fr 1fr;
This snippet creates five columns. The first column is as wide as its content, the second column is 50px, the third column is 10% of its container, and for the last two columns; the remaining space is divided into three sections, two are allocated for the fourth column, and one for the fifth.

## GRID COLUMN GAP

Sometimes you want a gap in between the columns. To add a gap between the columns, use the grid-column-gap property like this:

grid-column-gap: 10px;
This creates 10px of empty space between all of our columns.

## GRID ROW GAP

You can add a gap in between the rows of a grid using grid-row-gap in the same way that you added a gap in between columns .

'''css

grid-row-gap:10px;

'''

## GRID GAP

grid-gap is a shorthand property for grid-row-gap and grid-column-gap from the previous two challenges that's more convenient to use. If grid-gap has one value, it will create a gap between all rows and columns. However, if there are two values, it will use the first one to set the gap between the rows and the second value for the columns.

## JUSTIFY_SELF

You can align the content's position within its cell horizontally using the justify-self property on a grid item.
By default, this property has a value of stretch, which will make the content fill the whole width of the cell. 

**This CSS Grid property accepts other values as well:**

**start**: aligns the content at the left of the cell,

**center**: aligns the content in the center of the cell,

**end**: aligns the content at the right of the cell.

## ALIGN SELF

By default, this property has a value of stretch, which will make the content fill the whole height of the cell. 

**This CSS Grid property accepts other values as well**:

**start**: fill the whole height of the cell,

**center**: aligns the content in the center of the cell,

**end**: aligns the content at the bottom of the cell.

## JUSTIFY-ITEMS(Align All Items Horizontally)

Sometimes you want all the items in your CSS Grid to share the same alignment. You can use the previously learned properties and align them individually, or you can align them all at once horizontally by using justify-items on your grid container.

**stretch**: which will make the content fill the whole width of the cell.

**start**: aligns the content at the left of the cell,

**center**: aligns the content in the center of the cell,

**end**: aligns the content at the right of the cell.

## ALIGN ALL (Align All Items Vertically)

Using the align-items property on a grid container will set the vertical alignment for all the items in our grid.

**stretch**: which will make the content fill the whole height of the cell,

**start**: fill the whole height of the cell,

**center**: aligns the content in the center of the cell,

**end**: aligns the content at the bottom of the cell.

## GRID-TEMPLATE-AREA

You can group cells of your grid together into an area and give the area a custom name. Do this by using grid-template-areas on the container like this:

'''css

grid-template-areas:
"header header header"
"advert content content"
"footer footer footer";

'''

The code above merges the top three cells together into an area named header, the bottom three cells into a footer area, and it makes two areas in the middle row; advert and content. Note: Every word in the code represents a cell and every pair of quotation marks represent a row. In addition to custom labels, you can use a period (.) to designate an empty cell in the grid.

## GRID AREA

After creating an area template for your grid container, as shown previously, you can place an item in your custom area by referencing the name you gave it. To do this, you use the grid-area property on an item like this:

'''css

.item1 {
grid-area: header;
}

'''

This lets the grid know that you want the item1 class to go in the area named header. In this case, the item will use the entire top row because that whole row is named as the header area.

## GRID AREA (WITHOUT CREATING A GRID AREA)

If your grid doesn't have an areas template to reference, you can create an area on the fly for an item to be placed like this:

item1 { grid-area: 1/1/2/4; }  

**grid-area: row-start/column-start/row-end/column-end**

This is using the line numbers you learned about earlier to define where the area for this item will be. The numbers in the example above represent these values:

grid-area: horizontal line to start at / vertical line to start at / horizontal line to end at / vertical line to end at;
grid-area: row-start/column-start/row-end/column-end

So the item in the example will consume the rows between lines 1 and 2, and the columns between lines 1 and 4.

## REPEAT FUNCTION

Let's say you want a grid with 100 rows of the same height. It isn't very practical to insert 100 values individually. Fortunately, there's a better way - by using the repeat function to specify the number of times you want your column or row to be repeated, followed by a comma and the value you want to repeat.

Here's an example that would create the 100 row grid, each row at 50px tall.

grid-template-rows: repeat(100, 50px);
You can also repeat multiple values with the repeat function and insert the function amongst other values when defining a grid structure. Here's what that looks like:

grid-template-columns: repeat(2, 1fr 50px) 20px;
This translates to:

grid-template-columns: 1fr 50px 1fr 50px 20px;
Note: The 1fr 50px is repeated twice followed by 20px.

## MINMAX

There's another built-in function to use with grid-template-columns and grid-template-rows called minmax. It's used to limit the size of items when the grid container changes size. To do this you need to specify the acceptable size range for your item. Here is an example:

grid-template-columns: 100px minmax(50px, 200px);

In the code above, grid-template-columns is set to create two columns; the first is 100px wide, and the second has the minimum width of 50px and the maximum width of 200px.

## AUTO FILL

Create Flexible Layouts Using auto-fill
The repeat function comes with an option called auto-fill. This allows you to automatically insert as many rows or columns of your desired size as possible depending on the size of the container. You can create flexible layouts when combining auto-fill with minmax, like this:

repeat(auto-fill, minmax(60px, 1fr));

When the container changes size, this setup keeps inserting 60px columns and stretching them until it can insert another one. Note: If your container can't fit all your items on one row, it will move them down to a new one.

## AUTO-FIT

auto-fit works almost identically to auto-fill. The only difference is that when the container's size exceeds the size of all the items combined, auto-fill keeps inserting empty rows or columns and pushes your items to the side, while auto-fit collapses those empty rows or columns and stretches your items to fit the size of the container.

Note: If your container can't fit all your items on one row, it will move them down to a new one.
