<h1>HTML Cover Flow</h1>
<img src="http://imperdiblesoft.github.io/coverflow/images/logo_512.png" />
<p>HTML Cover Flow is an Apple's Cover Flow recreation based on HTML, CSS3 and JS.</p>

<p>It is compatible with Google Chrome and Firefox, and you can use it no matter what framework you are using.</p>

<p>Just create the slider container, and the wrapper for the images, like this:</p>
<code>&lt;div class="cf-slider" &gt;</code>
  <code>&lt;div class="cf-wrapper"&gt;</code>
  <code>&lt;/div&gt;</code>
<code>&lt;/div&gt;</code>

<p>Then, simply add your image (surrounded by 2 Divs) to the wrapper, like this:</p>
<code>
  &lt;div id="1" class="cf-square" &gt;
    &lt;div&gt;
      &lt;img src="images/myimage1.jpg" /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
</code>

<code>
  &lt;div id="2" class="cf-square" &gt;
    &lt;div&gt;
      &lt;img src="images/myimage2.jpg" /&gt;
    &lt;/div&gt;
  &lt;/div&gt;
</code>
