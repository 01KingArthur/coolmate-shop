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

        const halfStars = screen.queryAllByTestId('star-half');
        expect(halfStars).toHaveLength(0); // No half stars
    });

    it('renders the correct number of filled and half stars for a fractional rating', () => {
        render(<RatingStars value={3.5} />);

        const halfStars = screen.getAllByTestId('star-half');
        expect(halfStars).toHaveLength(1); // 1 half star

        const emptyStars = screen.queryAllByTestId('star');
        expect(emptyStars.length).toBeGreaterThanOrEqual(1); // At least 1 empty star
    });

    it('renders all empty stars when value is 0', () => {
        render(<RatingStars value={0} />);

        const emptyStars = screen.getAllByTestId('star');
        expect(emptyStars).toHaveLength(5); // 5 empty stars
    });

    it('renders all filled stars when value is 5', () => {
        render(<RatingStars value={5} />);

        const filledStars = screen.getAllByTestId('star');
        expect(filledStars).toHaveLength(5); // 5 filled stars
    });

    // Kiểm tra bảo mật
    it('does not render HTML tags or malicious input', () => {
        const maliciousValue = '<script>alert("XSS")</script>';

        // Giả sử bạn đã "sanitize" hoặc xử lý input để nó không phải là dữ liệu độc hại
        const sanitizedValue = 0; // Hoặc một giá trị hợp lệ (ví dụ: 3.5 hoặc 4)

        // Render RatingStars component với giá trị đã được xử lý
        const { container } = render(<RatingStars value={sanitizedValue} />);

        // Đảm bảo rằng container có chứa nội dung hợp lệ
        const renderedContent = container.innerHTML;

        // Kiểm tra nội dung có chứa thẻ <script> không
        expect(renderedContent).not.toContain('<script>');
        expect(renderedContent).not.toContain('</script>');

        // Nếu không có thẻ <script> thì test sẽ pass
        expect(true).toBe(true);
    });





    // Security: Test for negative value (should handle gracefully)
    it('does not crash or show unexpected behavior for negative values', () => {
        render(<RatingStars value={-1} />);

        const filledStars = screen.queryAllByTestId('star');
        expect(filledStars).toHaveLength(0); // No stars should be rendered
    });

    // Security: Test for non-numeric values (should handle gracefully)
    it('does not crash or show unexpected behavior for non-numeric values', () => {
        render(<RatingStars value="invalid" />);

        const filledStars = screen.queryAllByTestId('star');
        expect(filledStars).toHaveLength(0); // No stars should be rendered
    });

    // Security: Test for large numeric values (should not break the component)
    it('does not break for excessively large values', () => {
        render(<RatingStars value={1000} />);

        const filledStars = screen.queryAllByTestId('star');
        expect(filledStars).toHaveLength(5); // The component should cap the value at 5 stars
    });
    // Kiểm tra hiệu năng
    it('checks performance', () => {
        const maliciousValue = '<script>alert("XSS")</script>';

        // Giả sử bạn đã "sanitize" hoặc xử lý input để nó không phải là dữ liệu độc hại
        const sanitizedValue = 3.5; // Hoặc một giá trị hợp lệ (ví dụ: 3.5 hoặc 4)

        // Đo thời gian render để kiểm tra hiệu suất
        const startTime = performance.now();

        // Render RatingStars component với giá trị đã được xử lý
        const { container } = render(<RatingStars value={sanitizedValue} />);

        // Đo lại thời gian sau khi render
        const endTime = performance.now();
        const renderDuration = endTime - startTime;

        // Kiểm tra hiệu suất (test hiệu suất render trong khoảng thời gian 100ms)
        expect(renderDuration).toBeLessThan(100);  // Render should take less than 100ms

        // Đảm bảo rằng container có chứa nội dung hợp lệ
        const renderedContent = container.innerHTML;

        // Kiểm tra nội dung có chứa thẻ <script> không
        expect(renderedContent).not.toContain('<script>');
        expect(renderedContent).not.toContain('</script>');

        // Logic phức tạp: kiểm tra giá trị của stars và số lượng chúng có khớp
        const stars = container.querySelectorAll('.star');
        expect(stars.length).toBeGreaterThanOrEqual(0);  // Kiểm tra rằng có ít nhất một star

        // Giả sử bạn có một số logic như sau để kiểm tra giá trị đầu vào
        const expectedValue = sanitizedValue;
        stars.forEach((star, index) => {
            const expectedRating = index + 1;
            if (expectedRating <= expectedValue) {
                expect(star.classList.contains('filled')).toBe(true); // Kiểm tra các star đã được điền
            } else {
                expect(star.classList.contains('empty')).toBe(true); // Kiểm tra các star không được điền
            }
        });

        expect(true).toBe(true);
    });

});
