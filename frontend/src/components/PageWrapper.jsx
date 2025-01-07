import React, {useEffect} from 'react';

const PageWrapper = (props) => {
    useEffect(() => {
        if (props.title) {
            document.title = props.title;
        }
    }, [])

    return (
        <div className={`mx-auto max-w-screen-2xl px-4 md:px-8 mb-8 md:mb-16 min-h-[70vh] ${props.className}`}>
            {props.children}
        </div>
    );
};

export default PageWrapper;