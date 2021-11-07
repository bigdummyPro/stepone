

const clickOutsideRef = (content_ref, toggle_ref) => {
    document.addEventListener('mousedown', (e) => {
        if(toggle_ref.current && toggle_ref.current.contains(e.target)){
            content_ref.current.classList.toggle('--active');
        }else{
            if(content_ref.current && !content_ref.current.contains(e.target)){
                content_ref.current.classList.remove('--active');
            }
        }
    })
}

export default clickOutsideRef;