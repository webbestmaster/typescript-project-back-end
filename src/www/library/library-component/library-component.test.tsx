/* global describe, it, expect */
import {render, screen} from '@testing-library/react';

import {LibraryComponent} from './library-component';

describe('LibraryComponent', () => {
    it('default state', () => {
        render(<LibraryComponent textContent="some text">child node</LibraryComponent>);

        expect(screen.getByText('child node')).toBeInTheDocument();
    });
});
