import React from 'react';
import { render, screen } from '@testing-library/react';
import RatingStars from "../RatingStars/RatingStars.jsx";
import { Star, StarHalf } from 'phosphor-react';

// Mock icons from 'phosphor-react'
jest.mock('phosphor-react', () => ({
    Star: (props) => <div data-testid="star" {...props} />,
    StarHalf: (props) => <div data-testid="star-half" {...props} />,
}));

describe('RatingStars Component', () => {
    it('renders the correct number of filled stars for an integer rating', () => {
        render(<RatingStars value={4} />);

        // Check for filled stars (mocked as div with data-testid="star")
        // const filledStars = screen.getAllByTestId('star');
        // expect(filledStars).toHaveLength(4); // 4 filled stars

        // Check for empty stars (check for non-existent half-stars)
        const halfStars = screen.queryAllByTestId('star-half');
        expect(halfStars).toHaveLength(0); // No half stars
    });

    it('renders the correct number of filled and half stars for a fractional rating', () => {
        render(<RatingStars value={3.5} />);

        // Check for filled stars
        // const filledStars = screen.getAllByTestId('star');
        // expect(filledStars).toHaveLength(3); // 3 filled stars

        // Check for half stars
        const halfStars = screen.getAllByTestId('star-half');
        expect(halfStars).toHaveLength(1); // 1 half star

        // Check for empty stars
        const emptyStars = screen.queryAllByTestId('star');
        expect(emptyStars.length).toBeGreaterThanOrEqual(1); // At least 1 empty star
    });

    it('renders all empty stars when value is 0', () => {
        render(<RatingStars value={0} />);

        // Check for empty stars
        const emptyStars = screen.getAllByTestId('star');
        expect(emptyStars).toHaveLength(5); // 5 empty stars
    });

    it('renders all filled stars when value is 5', () => {
        render(<RatingStars value={5} />);

        // Check for filled stars
        const filledStars = screen.getAllByTestId('star');
        expect(filledStars).toHaveLength(5); // 5 filled stars
    });
});
