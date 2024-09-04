import { render, screen, fireEvent } from '@testing-library/react';
import { describe, test, expect, vi } from 'vitest';
import { Filter } from './Filter';

describe('Filter Component', () => {
  const mockOnFilter = vi.fn();

  const props = {
    title: 'Category',
    list: ['Option 1', 'Option 2', 'Option 3'],
    filtersApplied: {
      source: ['Option 1'],
    },
    onFilter: mockOnFilter,
  };

  test('renders with correct title and checkboxes', () => {
    render(<Filter {...props} />);

    const titleElement = screen.getByText(props.title);
    expect(titleElement).toBeInTheDocument();

    props.list.forEach((filter) => {
      expect(screen.getByLabelText(filter)).toBeInTheDocument();
    });
  });

  test('checkboxes reflect the filtersApplied state correctly', () => {
    render(<Filter {...props} />);

    const checkedCheckbox = screen.getByLabelText('Option 1');
    expect(checkedCheckbox).toBeChecked();

    const uncheckedCheckboxes = ['Option 2', 'Option 3'].map(option =>
      screen.getByLabelText(option)
    );
    uncheckedCheckboxes.forEach(checkbox => expect(checkbox).not.toBeChecked());
  });

  test('calls onFilter with correct parameters when a checkbox is clicked', () => {
    render(<Filter {...props} />);
    
    const checkbox = screen.getByLabelText('Option 2');
    fireEvent.click(checkbox);

    expect(mockOnFilter).toHaveBeenCalledWith('source', 'Option 2', true);
  });
});
