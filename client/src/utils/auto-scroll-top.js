export default function autoScrollTop(){
    if(window.pageYOffset !== 0){
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }
}