class Datee{
    constructor( {
                     timestamp,
                     date,
                     timezones = {},
                     currentTimezone,
                     templates = {},
                     defaultTemplate
                 } = {} ){
        if( timestamp !== undefined ){
            this._timestamp = timestamp;
        }
        else if( date ){
            this._timestamp = Math.floor( date.getTime() / 1000 );
        }

        this._timezones = {
            ...timezones,
            "UTC": 0,
            "client": -new Date().getTimezoneOffset() * 60
        };

        this._currentTimezone = currentTimezone !== undefined ? currentTimezone : this._timezones.client;
        this._templates = templates;
        this._defaultTemplate = defaultTemplate;
    }

    static throwNotInitialized(){
        throw new Error( "Timestamp or date not provided" );
    }

    static throwTimezoneNotFound( timezoneName ){
        throw new Error( `Timezone "${timezoneName}" not found` );
    }

    static throwTemplateNotFound(){
        throw new Error( `Template for method "toString" not found` );
    }

    static copy( datee ){
        return new Datee( {
            timestamp: datee._timestamp,
            timezones: datee._timezones,
            currentTimezone: datee._currentTimezone,
            templates: datee._templates,
            defaultTemplate: datee._defaultTemplate
        } );
    }

    static fromDate( date, options = {} ){
        return new Datee( { date, ...options } );
    }

    static fromTimestamp( timestamp, options = {} ){
        return new Datee( { timestamp, ...options } );
    }

    maybeConvertTimezone( timezone ){
        if( typeof timezone === "string" ){
            if( !( timezone in this._timezones ) ){
                Datee.throwTimezoneNotFound( timezone );
            }

            timezone = this._timezones[ timezone ];
        }

        return timezone;
    }

    get instance(){
        return Datee.copy( this );
    }

    get timestamp(){
        if( this._timestamp === undefined ){
            Datee.throwNotInitialized();
        }

        return this._timestamp;
    }

    get date(){
        if( this._timestamp === undefined ){
            Datee.throwNotInitialized();
        }

        return new Date( this._timestamp * 1000 );
    }

    setTimestamp( timestamp, currentTimezone ){
        this._timestamp = timestamp;

        this._currentTimezone = currentTimezone
            ? this.maybeConvertTimezone( currentTimezone )
            : this._timezones.client;

        return this;
    }

    setDate( date, currentTimezone ){
        return this.setTimestamp( Math.floor( date.getTime() / 1000 ), currentTimezone );
    }

    setTemplate( name, template ){
        this._templates[ name ] = template;

        return this;
    }

    to( timezone ){
        if( this._timestamp === undefined ){
            Datee.throwNotInitialized();
        }

        timezone = this.maybeConvertTimezone( timezone );
        this._timestamp += this._currentTimezone - timezone;
        this._currentTimezone = timezone;

        return this;
    }

    toString( templateName ){
        if( this._timestamp === undefined ){
            Datee.throwNotInitialized();
        }

        if( !templateName ){
            if( !this._defaultTemplate ){
                Datee.throwTemplateNotFound();
            }

            templateName = this._defaultTemplate;
        }

        const timestamp = this._timestamp - this._timezones.client + this._currentTimezone;
        const date = new Date( timestamp * 1000 );
        const year = `${date.getFullYear()}`;
        let month = `${date.getMonth() + 1}`;
        let day = `${date.getDate()}`;
        let hours = `${date.getHours()}`;
        let minutes = `${date.getMinutes()}`;
        let seconds = `${date.getSeconds()}`;

        if( month.length === 1 ) month = `0${month}`;
        if( day.length === 1 ) day = `0${day}`;
        if( hours.length === 1 ) hours = `0${hours}`;
        if( minutes.length === 1 ) minutes = `0${minutes}`;
        if( seconds.length === 1 ) seconds = `0${seconds}`;

        return this._templates[ templateName ]
            .replace( /yyyy/g, year )
            .replace( /MM/g, month )
            .replace( /dd/g, day )
            .replace( /hh/g, hours )
            .replace( /mm/g, minutes )
            .replace( /ss/g, seconds );
    }
}

export { Datee };