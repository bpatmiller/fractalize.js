## Fractalize.js

The spiritual successor to [Fractalize.me](https://github.com/bpatmiller/fractalize.me)

### Controls

- Drag an image from your computer onto the page to `fractalize` it
- Click and drag on fractal display to pan
- Hover over fractal display to animate
- Scroll to zoom in and out
- Press `s` to hide/show the source image
- Press `SPACEBAR` to disable/enable animation

### Pipeline

Source images are segmented using the pretrained [DeepLab](https://github.com/tensorflow/tfjs-models/blob/master/deeplab/README.md) tensorflow.js models. The segmented image is broken up into connected subsets, to satisfy that each subset is a [closed jordan curve](https://en.wikipedia.org/wiki/Jordan_curve_theorem) ([see here](https://arxiv.org/pdf/1607.05055.pdf))

Parallel to this, the source image color pallete is extracted for coloring the generated fractals.

For each connected subset, we find `n` Leja points of that set. In this context, a Leja point can be thought of "the most efficient bounding point", so a set of Leja points provides an efficient description of a curves boundary.
These Leja points are passed to a fragment shader, where they are used to generate a [Fekete polynomial](https://en.wikipedia.org/wiki/Fekete_polynomial). The fragment shader iterates each fragment as a complex point through the generated polynomial, and shades based on the resulting iterations to divergence and total distance travelled by the point.

The WebGL rendering pipeline is handled by Three.js, and each generated fractal is assigned its own plane mesh and fragment shader.

For artistic effect, the fragment shader distorts the computation of the Fekete polynomial and the blends the coloring of the fractal between a color from the generated color pallete, and a function of distance travelled by that complex point. To see this distortion, hover over the fractal.

### Limitations

Segmentation is a clear limiting factor in this pipeline. The DeepLab models provide reasonable and visually pleasing results with a broad range of real images, but struggles with synthetic images.

Managing the overlap of fractals is a current limitation that can be overcome. At this point, some results are "muddy" and detailed parts of the generated image are obscured by what should be background components. I plan on implimenting some sort of z-sorting determined by the amount of overlap each fractal has with the convex hull of each other fractal.
