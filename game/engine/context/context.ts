import HTML from '../canvas';

const generateHTMLCanvas = () => {
    const element = document.createElement('canvas');
    element.id = 'myCanvas';
    element.width = 640;
    element.height = 480;

    return element;
};

document.body.appendChild(generateHTMLCanvas());

const Context = new HTML('myCanvas', 640, 480);
export default Context;


