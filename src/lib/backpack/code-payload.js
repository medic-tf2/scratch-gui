import blockToImage from './block-to-image';
import createThumbnail from './thumbnail';
import {Base64} from 'js-base64';

const codePayload = ({blockObjects, topBlockId}) => {
    const payload = {
        type: 'script', // Needs to match backpack-server type name
        name: 'code', // All code currently gets the same name
        mime: 'application/json',
        // Backpack expects a base64 encoded string to store. Cannot use btoa because
        // the code can contain characters outside the 0-255 code-point range supported by btoa
        body: Base64.encode(JSON.stringify(blockObjects)) // Base64 encode the json
    };

    return blockToImage(topBlockId)
        .then(createThumbnail)
        .then(thumbnail => {
            payload.thumbnail = thumbnail;
            return payload;
        });
};

const findTopBlock = payload => {
    const blocks = payload.extensionURLs ? payload.blocks : payload;
    return blocks.find(i => i.topLevel);
};

export {
    codePayload as default,
    findTopBlock
};
