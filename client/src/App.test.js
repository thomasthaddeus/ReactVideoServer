import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';


test('renders the section title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Section 5/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders video cards', () => {
  render(<App />);
  const videoCards = screen.getAllByRole('img');
  expect(videoCards.length).toBeGreaterThan(0);
});

test('opens video player on thumbnail click', () => {
  render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const videoElement = screen.getByRole('video');
  expect(videoElement).toBeInTheDocument();
});

test('closes video player on close button click', () => {
  render(<App />);
  const thumbnail = screen.getAllByRole('img')[0];
  fireEvent.click(thumbnail);
  const closeButton = screen.getByText(/X/i);
  fireEvent.click(closeButton);
  const videoElement = screen.queryByRole('video');
  expect(videoElement).not.toBeInTheDocument();
});
