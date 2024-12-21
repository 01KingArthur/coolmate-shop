import { render, screen, fireEvent } from '@testing-library/react';
import SlidingCart from './SlidingCart';
import { useDispatch, useSelector } from 'react-redux';
import { addProductQuantity, removeFromCart } from '~/redux/cartSlice';
import { BrowserRouter as Router } from 'react-router-dom';
import toast from 'react-hot-toast';

// Mocking Redux hooks
jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

// Mocking react-hot-toast
jest.mock('react-hot-toast', () => ({
    success: jest.fn(),
}));

describe('SlidingCart Component', () => {
    let mockDispatch;

    beforeEach(() => {
        mockDispatch = jest.fn();
        useDispatch.mockReturnValue(mockDispatch);
        useSelector.mockReturnValue([
            {
                product: { name: 'Product 1', price: 100, slug: 'product-1', category: { name: 'Category 1' } },
                image: 'image1.jpg',
                quantity: 2,
                size: 'M',
                color: 'Red',
            },
            {
                product: { name: 'Product 2', price: 200, slug: 'product-2', category: { name: 'Category 2' } },
                image: 'image2.jpg',
                quantity: 1,
                size: 'L',
                color: 'Blue',
            },
        ]);
    });

    it('renders the SlidingCart component with items', () => {
        render(
            <Router>
                <SlidingCart toggleShowCart={jest.fn()} />
            </Router>
        );

        // Check if the cart items are rendered
        expect(screen.getByText('Your Shopping Carts')).toBeInTheDocument();
        expect(screen.getByText('Product 1')).toBeInTheDocument();
        expect(screen.getByText('Product 2')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    it('shows a message when the cart is empty', () => {
        useSelector.mockReturnValue([]); // Mock empty cart

        render(
            <Router>
                <SlidingCart toggleShowCart={jest.fn()} />
            </Router>
        );

        expect(screen.getByText('Your cart is empty :( ')).toBeInTheDocument();
    });

    it('increases product quantity when input changes', () => {
        render(
            <Router>
                <SlidingCart toggleShowCart={jest.fn()} />
            </Router>
        );

        const quantityInput = screen.getAllByLabelText('Quantity:')[0];
        fireEvent.change(quantityInput, { target: { value: '3' } });

        expect(mockDispatch).toHaveBeenCalledWith(
            addProductQuantity({ index: 0, quantity: 3 })
        );
    });

    it('removes a product from the cart when the remove button is clicked', () => {
        render(
            <Router>
                <SlidingCart toggleShowCart={jest.fn()} />
            </Router>
        );

        const removeButton = screen.getAllByTestId('cart-product_x')[0];
        fireEvent.click(removeButton);

        expect(mockDispatch).toHaveBeenCalledWith(removeFromCart({ index: 0 }));
        expect(toast.success).toHaveBeenCalledWith('Removed from Cart ');
    });

    it('calculates the correct total price for checkout', () => {
        render(
            <Router>
                <SlidingCart toggleShowCart={jest.fn()} />
            </Router>
        );

        // Calculate the total price (based on the mock data)
        const totalPrice = 100 * 2 + 200 * 1;
        expect(screen.getByText(`${totalPrice}đ`)).toBeInTheDocument();
    });

    it('closes the cart when the close button is clicked', () => {
        const toggleShowCartMock = jest.fn();

        render(
            <Router>
                <SlidingCart toggleShowCart={toggleShowCartMock} />
            </Router>
        );

        const closeButton = screen.getByTestId('close-shopping-cart');
        fireEvent.click(closeButton);

        expect(toggleShowCartMock).toHaveBeenCalled();
    });
});
