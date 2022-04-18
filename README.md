# bubblemenu
A Bubble Menu created using D3.js. Bubbles change sizes when mouse moves over top level menu.
Note that this is based on the version 7 of d3.js.

## Quick Tutorial

### Include CSS and JS libraries

```
  <link rel="stylesheet" type="text/css" href="./bubbleui.css">

  <script src="https://cdn.jsdelivr.net/npm/d3@7" charset="utf-8"></script>
  <script src="https://cdn.jsdelivr.net/npm/d3-color@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/d3-interpolate@3"></script>
  <script src="https://cdn.jsdelivr.net/npm/d3-scale-chromatic@3"></script>

  <script type="text/javascript" src="./bubbleui-min.js"></script>    

```
### Create a BubbleUI Object

The BubbleUI class can create the bubble menu within a DIV. It also accept various options (see the source code for the details of the options).

```
    let b = new BubbleUI('#mainBubble', options  ={
        "margins": [5,5,5,5],
        "responsiveSetting": (p) => {
            if (p >= 1000) return 4;
            else if (p >= 600) return 2;
            else return 1;
        },
        }).init(); // see the source file for options
```
Load the data into the menu and resize it when necessary.

```
    d3.json("main_bubble.json").then(root) {
        b.addData(root);
        b.resize();
    });

    window.onresize = () => {
      b.resize();
    };
```