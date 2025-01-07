import React from 'react';


const SocialsIcons = ({socials}) => {
    return (
        <div className="flex gap-4">
            {socials.map((social) =>
                <a key={social.id} href={social.direct_link} target="_blank"
                   title={`${social.title} ${social.internal_link}`}
                   className="text-gray-400 transition duration-100 hover:text-gray-500 active:text-gray-600">
                    <svg className="bi w-5 h-5" width="32" height="32" fill="currentColor">
                        <use xlinkHref={`/socials.svg#${social.icon}`}/>
                    </svg>
                </a>
            )}
        </div>
    );
};

export default SocialsIcons;