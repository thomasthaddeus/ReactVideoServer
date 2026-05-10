import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';


test('renders the section title', () => {
  render(<App />);
  const titleElement = screen.getAllByText(/Section 5/i)[0];
  expect(titleElement).toBeInTheDocument();
});

test('renders video cards', () => {
  render(<App />);
  const videoCards = screen.getAllByRole('img');
  expect(videoCards.length).toBeGreaterThan(0);
});

test('filters video cards from search input', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText(/search videos/i), {
    target: { value: 'rebarrel' },
  });

  expect(screen.getByText(/matching "rebarrel"/i)).toBeInTheDocument();
  expect(screen.getAllByRole('button', { name: /play rebarrel/i })).toHaveLength(2);
});

test('opens video player on thumbnail click', () => {
  const { container } = render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const videoElement = container.querySelector('video');
  expect(videoElement).toBeInTheDocument();
});

test('closes video player on close button click', () => {
  const { container } = render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const closeButton = screen.getByRole('button', { name: /close video player/i });
  fireEvent.click(closeButton);
  const videoElement = container.querySelector('video');
  expect(videoElement).not.toBeInTheDocument();
});
