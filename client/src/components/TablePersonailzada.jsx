import React from 'react';

export const TablePersonailzada = ({ data = [], columns = [], columnasVisibles = [], actions = [], renderers = {} }) => {
  // Filtra las columnas visibles
  const filteredColumns = columnasVisibles.length > 0 
    ? columns.filter(col => columnasVisibles.includes(col.key)) 
    : columns;

  return (
    <table className="table">
      <thead>
        <tr>
          {filteredColumns.length === 0 ? (
            <th>Sin data</th>
          ) : (
            filteredColumns.map((col, index) => (
              <th key={index}>{col.title}</th>
            ))
          )}
          {actions.length > 0 && <th>Acciones</th>}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={filteredColumns.length + 1}>Sin datos</td>
          </tr>
        ) : (
          data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {filteredColumns.map((col, colIndex) => (
                <td key={colIndex}>
                  {renderers[col.key] ? renderers[col.key](row[col.key], row) : row[col.key]}
                </td>
              ))}
              {actions.length > 0 && (
                <td className='d-flex gap-2'>
                  {actions.map((ActionComponent, indexAction) => (
                    <ActionComponent key={indexAction} rowData={row} />
                  ))}
                </td>
              )}
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};
