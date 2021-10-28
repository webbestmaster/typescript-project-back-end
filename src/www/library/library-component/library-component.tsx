import {ReactNode} from 'react';

import libraryStyle from './library.scss';

export type LibraryPropsType = {
    children: ReactNode;
    textContent: string;
};

export function LibraryComponent(props: LibraryPropsType): JSX.Element {
    const {children, textContent} = props;

    return (
        <div className={libraryStyle.test_library}>
            <h3 className={libraryStyle.test_library__header}>{textContent}</h3>
            <div>{children}</div>
        </div>
    );
}
