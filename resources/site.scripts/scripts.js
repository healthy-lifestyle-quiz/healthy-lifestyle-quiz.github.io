( () => {
    document.body.addEventListener(
        'click',
        (event) => {
            // Find the closest <a> element (in case of nested elements)
            let anchorElement = event.target.closest( 'a' );

            if (
                !anchorElement
                || anchorElement.getAttribute( 'target' ) === '_blank'
                || event.ctrlKey
                || event.metaKey
            ) {
                return;
            }

            window.history.pushState(
                null,
                null,
                anchorElement.getAttribute( 'href' )
            );

            if ( anchorElement.getAttribute( 'href' ).startsWith( '#' ) ) {
                return;
            }

            event.preventDefault();

            if ( anchorElement.getAttribute( 'href' ) === '' ) {
                return;
            };

            if (
                anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/v1/zh-Hant/'
                || anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/v1/'
                || anchorElement.getAttribute('href') === 'https://healthy-lifestyle-quiz.github.io/'
            ) {
                document.title = '健康生活型態測驗 Healthy Lifestyle Test';
            } else if (
                anchorElement.getAttribute('href').startsWith( 'https://healthy-lifestyle-quiz.github.io' )
            ) {
                window.open( anchorElement.getAttribute( 'href' ), '_self' );
            } else {
                window.open( anchorElement.getAttribute( 'href' ) );
            };
        }
    )

    /*
    document.getElementById( 'fullscreen_enter_button' ).addEventListener(
        'click',
        () => {
            if ( window.initialFullscreen ) {
                return;
            }

            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            }

            window.initialFullscreen = true;
        }
    )
    */
} ) ();
