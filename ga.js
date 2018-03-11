(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-115467989-1', 'auto');

window.document.addEventListener('click', (e) => {

    var trackable = e.target.ga || e.target.parentNode.ga
    if (trackable) {
      ga('set', 'page', trackable);
      ga('send', 'pageview');
    }

} )
