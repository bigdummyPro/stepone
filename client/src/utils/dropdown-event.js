

const clickOutsideRef = (content_ref, toggle_ref, sidebarEl) => {
    const dropEvent = (e) =>{
        if(toggle_ref.current && toggle_ref.current.contains(e.target)){
            content_ref.current.classList.toggle('--active');
            sidebarEl && sidebarEl.classList.toggle('--active');
        }else{
            if(content_ref.current && !content_ref.current.contains(e.target)){
                content_ref.current.classList.remove('--active');
                sidebarEl && sidebarEl.classList.remove('--active');
            }
        }
    }
    if(toggle_ref.current || content_ref.current){
        document.addEventListener('mousedown', (e) => dropEvent(e));
    }
    else if(!toggle_ref.current && !content_ref.current){
        document.removeEventListener('mousedown', (e) => dropEvent(e));
    }
}

export default clickOutsideRef;