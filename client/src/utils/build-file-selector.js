export default async function buildFileSelector(acceptType){
    const fileSelector = document.createElement('input');
    fileSelector.setAttribute('type', 'file');
    fileSelector.setAttribute('multiple', 'multiple');
    fileSelector.setAttribute('accept', acceptType);
    fileSelector.click();
    return fileSelector;
}