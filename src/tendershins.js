class Tendershins {
    /**
     * @param sourcePath path to specification file
     * @param logoPath path to logo
     */
    constructor( sourcePath, logoPath ) {

        this.shell = require( 'shelljs' );
        this.path  = require( 'path' );
        this.fs    = require( 'fs-extra' );

        this.sourcePath = sourcePath;
        this.logoPath   = logoPath;

        this.widdershinsDir = this.path.dirname( require.resolve( 'widdershins' ) );
        this.shinsDir       = this.path.dirname( require.resolve( 'shins' ) );
    }

    /**
     * @param targetPath target path destination for rendered HTML
     */
    render( targetPath ) {
        this.renderWiddershins();
        this.renderShins();

        this.fs.removeSync( targetPath );
        this.fs.ensureDirSync( targetPath );
        this.fs.copySync( this.shinsDir + '/index.html', targetPath + '/index.html' );
        this.fs.copySync( this.shinsDir + '/source', targetPath + '/source' );
        this.fs.copySync( this.shinsDir + '/pub', targetPath + '/pub' );

        if ( this.logoPath ) {
            this.fs.copySync( this.logoPath, targetPath + '/source/images/logo.png' );
        }

        this.shell.exit( 1 );
    }

    renderWiddershins() {
        const cmd = 'node ' + this.widdershinsDir + '/widdershins.js --resolve ' + this.sourcePath
            + ' ' + this.shinsDir + '/source/index.html.md';

        if ( this.shell.exec( cmd ).code !== 0 ) {
            throw 'Widdershins render failed';
        }
    }

    renderShins() {
        const cmd = 'cd ' + this.shinsDir + ' && node shins.js --minify';

        if ( this.shell.exec( cmd ).code !== 0 ) {
            throw 'Shins render failed';
        }
    }
}

module.exports = Tendershins;