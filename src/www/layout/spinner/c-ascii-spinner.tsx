import {classNames} from '../../util/css';

import spinnerStyle from './spinner.scss';

type PropsType = {
    className?: string;
    isShow?: boolean;
};

export function AsciiSpinner(props: PropsType): JSX.Element | null {
    const {isShow = true, className} = props;

    if (!isShow) {
        return null;
    }

    const wrapperClassName = classNames(spinnerStyle.ascii_spinner, className);

    return <span aria-busy="true" className={wrapperClassName} />;
}
