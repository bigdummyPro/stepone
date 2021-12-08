

const clickOutsideRef = (content_ref, toggle_ref, sidebarEl) => {console.log('dit')
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
    document.addEventListener('mousedown', (e) => dropEvent(e));

    if(!content_ref || !toggle_ref)document.removeEventListener('mousedown', (e) => dropEvent(e));

    return dropEvent
}

export default clickOutsideRef;