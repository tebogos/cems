import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';

export default class DefaultUpload extends React.Component {
    constructor(props) {
        super(props);

        this.djsConfig = {
            addRemoveLinks: true,
            acceptedFiles: "image/jpeg,image/png,image/gif,application/pdf"
        };

        this.componentConfig = {
            iconFiletypes: ['.jpg', '.png', '.gif','.pdf','.tiff'],
            showFiletypeIcon: false,
            postUrl: '${baseUrl}/upload-handler'
        };

        // If you want to attach multiple callbacks, simply
        // create an array filled with all your callbacks.
        this.callbackArray = [() => console.log('Hi!'), () => console.log('Ho!')];

        // Simple callbacks work too, of course
        this.callback = (file) => console.log('Hello!',file);

        this.success = file =>this.props.updateUrl(file);

        this.progress = file => console.log('progress', file);

        this.removedfile = file => console.log('removing...', file);

        this.dropzone = null;
    }

    render() {
        const config = this.componentConfig;
        const djsConfig = this.djsConfig;

        // For a list of all possible events (there are many), see README.md!
        const eventHandlers = {
            init: dz => this.dropzone = dz,
            drop: this.callbackArray,
            addedfile: this.callback,
            success: this.success,
            removedfile: this.removedfile,
            uploadprogress: this.props.getProgress
        }

        return <DropzoneComponent config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
    }
}