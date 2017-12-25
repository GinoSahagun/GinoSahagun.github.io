/*!
    Title: Dev Portfolio Template
    Version: 1.2.1
    Last Change: 08/27/2017
    Author: Ryan Fitzgerald
    Repo: https://github.com/RyanFitzgerald/devportfolio-template
    Issues: https://github.com/RyanFitzgerald/devportfolio-template/issues

    Description: This file contains all the scripts associated with the single-page
    portfolio website.
*/

(function($) {

    // Remove no-js class
    $('html').removeClass('no-js');

    // Animate to section when nav is clicked
    $('header a').click(function(e) {

        // Treat as normal link if no-scroll class
        if ($(this).hasClass('no-scroll')) return;

        e.preventDefault();
        var heading = $(this).attr('href');
        var scrollDistance = $(heading).offset().top;

        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, Math.abs(window.pageYOffset - $(heading).offset().top) / 1);

        // Hide the menu once clicked if mobile
        if ($('header').hasClass('active')) {
            $('header, body').removeClass('active');
        }
    });

    // Scroll to top
    $('#to-top').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    // Scroll to first element
    $('#lead-down span').click(function() {
        var scrollDistance = $('#lead').next().offset().top;
        $('html, body').animate({
            scrollTop: scrollDistance + 'px'
        }, 500);
    });

    // Create timeline
    $('#experience-timeline').each(function() {

        $this = $(this); // Store reference to this
        $userContent = $this.children('div'); // user content

        // Create each timeline block
        $userContent.each(function() {
            $(this).addClass('vtimeline-content').wrap('<div class="vtimeline-point"><div class="vtimeline-block"></div></div>');
        });

        // Add icons to each block
        $this.find('.vtimeline-point').each(function() {
            $(this).prepend('<div class="vtimeline-icon"><i class="fa fa-map-marker"></i></div>');
        });

        // Add dates to the timeline if exists
        $this.find('.vtimeline-content').each(function() {
            var date = $(this).data('date');
            if (date) { // Prepend if exists
                $(this).parent().prepend('<span class="vtimeline-date">'+date+'</span>');
            }
        });

    });

    // Open mobile menu
    $('#mobile-menu-open').click(function() {
        $('header, body').addClass('active');
    });

    // Close mobile menu
    $('#mobile-menu-close').click(function() {
        $('header, body').removeClass('active');
    });

    // Load additional projects
    $('#view-more-projects').click(function(e){
        e.preventDefault();
        $(this).fadeOut(300, function() {
            $('#more-projects').fadeIn(300);
        });
    });

    //Background For Canvas in Intro Page
    Three_ParticleBG()

    coffeeSteam();
    
})(jQuery);

function coffeeSteam(){
    var steamGrp = [steamLeft, steamRight, steamMid],
      steamLeft = $('svg #steam-left'),
      steamRight = $('#steam-right'),
      steamMid = $('#steam-mid'),
      svg = $('svg'),
      rotate = new TimelineMax({paused:false, repeat: -1}),
      pulse = new TimelineMax({paused:false, repeat: -1, yoyo:true}),
      rise = new TimelineMax({paused:false, repeat: -1});
  

  rotate.to([steamLeft, steamRight, steamMid], 2, {rotationY:"+=360deg", transformOrigin:"50% 50%", ease: Linear.easeOut});
  
  pulse.set([steamLeft, steamRight, steamMid], {opacity: "0", ease: Linear.easeInOut})
       .to([steamLeft, steamRight, steamMid], 1.5, {opacity: ".75", ease: Linear.easeInOut});
  
  rise.staggerTo([steamMid, steamLeft, steamRight], 2, {y: "-=50px", ease: Linear.easeOut}, .5);

}

function Three_ParticleBG()
{
        var container, stats;
        var camera, scene, renderer, particle;
        var mouseX = 0,
            mouseY = 0;

        var windowHalfX = window.innerWidth / 2;
        var windowHalfY = window.innerHeight / 2;

        init();
        animate();

        function init() {

            container = document.getElementById('lead-overlay');
            var bg = document.getElementById("lead");
            bg.appendChild(container);
            console.log($(bg)[0].offsetWidth);
            camera = new THREE.PerspectiveCamera(75, $(bg)[0].offsetWidth / $(bg)[0].offsetHeight, 1, 5000);
            camera.position.z = 1000;

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0x000000);

            var material = new THREE.SpriteMaterial({
                map: new THREE.CanvasTexture(generateSprite()),
                blending: THREE.AdditiveBlending
            });

            for (var i = 0; i < 1000; i++) {

                particle = new THREE.Sprite(material);

                initParticle(particle, i * 10);

                scene.add(particle);
            }
            console.log($(bg)[0].offsetHeight);
            renderer = new THREE.WebGLRenderer();
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize($(bg)[0].offsetWidth, $(bg)[0].offsetHeight);
            container.appendChild(renderer.domElement);

            stats = new Stats();
            //container.appendChild(stats.dom);

            document.addEventListener('mousemove', onDocumentMouseMove, false);
            document.addEventListener('touchstart', onDocumentTouchStart, false);
            document.addEventListener('touchmove', onDocumentTouchMove, false);

            //

            window.addEventListener('resize', onWindowResize, false);

        }

        function onWindowResize() {

            var bg = document.getElementById("lead");
            windowHalfX = $(bg)[0].offsetWidth / 2;
            windowHalfY = $(bg)[0].offsetHeight / 2;

            camera.aspect = $(bg)[0].offsetWidth / $(bg)[0].offsetHeight;
            camera.updateProjectionMatrix();

            renderer.setSize($(bg)[0].offsetWidth, $(bg)[0].offsetHeight);

        }

        function generateSprite() {

            var canvas = document.createElement('canvas');
            canvas.width = 16;
            canvas.height = 16;

            var context = canvas.getContext('2d');
            var gradient = context.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2,
                canvas.height / 2, canvas.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');

            context.fillStyle = gradient;
            context.fillRect(0, 0, canvas.width, canvas.height);

            return canvas;

        }

        function getRandomArbitrary(min, max) {
            return Math.random() * (max - min) + min;
        }

        function initParticle(particle, delay) {

            var particle = this instanceof THREE.Sprite ? this : particle;
            var delay = delay !== undefined ? delay : 0;

            var bg = document.getElementById("lead");

            var maxWidth = $(bg)[0].offsetWidth;
            var minWidth = -$(bg)[0].offsetWidth + 50;
            var maxHeight = $(bg)[0].offsetHeight;
            var minHeight = -$(bg)[0].offsetHeight + 50;



            particle.position.set(0, 0, 0);
            particle.scale.x = particle.scale.y = Math.random() * 32 + 16;

            new TWEEN.Tween(particle)
                .delay(delay)
                .to({}, 10000)
                .onComplete(initParticle)
                .start();

            new TWEEN.Tween(particle.position)
                .delay(delay)
                .to({
                    x: Math.random() * 5000 - 2000,
                    y: Math.random() * 2000 - 1000,
                    z: Math.random() * 4000 - 2000
                }, 10000)
                .start();

            new TWEEN.Tween(particle.scale)
                .delay(delay)
                .to({
                    x: 0.01,
                    y: 0.01
                }, 10000)
                .start();

        }

        //

        function onDocumentMouseMove(event) {

            mouseX = event.clientX - windowHalfX;
            mouseY = event.clientY - windowHalfY;
        }

        function onDocumentTouchStart(event) {

            if (event.touches.length == 1) {

                event.preventDefault();

                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;

            }

        }

        function onDocumentTouchMove(event) {

            if (event.touches.length == 1) {

                event.preventDefault();

                mouseX = event.touches[0].pageX - windowHalfX;
                mouseY = event.touches[0].pageY - windowHalfY;

            }

        }

        //

        function animate() {

            requestAnimationFrame(animate);

            render();
            //stats.update();

        }

        function render() {

            TWEEN.update();

            camera.position.x += (mouseX - camera.position.x) * 0.05;
            camera.position.y += (-mouseY - camera.position.y) * 0.05;
            camera.lookAt(scene.position);

            renderer.render(scene, camera);

        }
}