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

The options.

| **Option** | **Explanation**  | **Default Value**  | **Example Values** |  
|------------|------------------|--------------------|--------------------|
| "focalEnlargeFactor" | enlarge factor for focused bubble    | 2      | 3.2 |
| "margins" | [top, left, bottom, right] margins to the DIV | [20, 20, 20, 20] | [5, 5, 5, 5] | 
| "maxChildrenNum"  | maximum number of children nodes | 8 | 12 |
| "subBubbleSizeRatios" | sub-bubble size scale factor [initial, activated] | [0.9, 0.95] | [0.9, 0.9] | 
| "textSizes" | text sizes for [bubble text and sub-bubble text: normal, enlarged, shrunk] | [30, 45, 18, 6, 12, 4] | [30, 42, 18, 4, 8, 3] |
| "textOpacities" | text opacities for top-level and sub-level texts  | [0.8, 0.4, 0.1] | - | 
| "bubbleOpacities" | opacities for top level bubbles, sub-bubble  | [0.4, 0.4, 0.1] |  - |   
| "bubbleColors" | A function returns the top level bubble color: ```function foo(i) { return color of i th bubble; }``` | <code> d3.scaleOrdinal(d3.schemeCategory10) </code>| <code> (i) => ["blue", "green","red", "#555"][i] </code> |
| "responsiveSetting" | A function that returns the number of columns for the bubbles. Parameter for the function is the width of the holding DIV. | ```(p) => {  if (p >= 1000) return 4; else if (p >= 600) return 2; else return 1;} ``` | ```(p) => { if (p >= 1400) return 4; else if (p >= 900) return 2; else return 1;} ```|

 

Then, load the data into the menu and resize it when necessary.

```
    d3.json("main_bubble.json").then(root) {
        b.addData(root);
        b.resize();
    });

    window.onresize = () => {
      b.resize();
    };
```