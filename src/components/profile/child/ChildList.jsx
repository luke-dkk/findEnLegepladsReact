import { useState } from 'react';
import { updateChild } from '../../../../apiReader';
import './ChildList.css';

function ChildList({ user }) {
  const [children, setChildren] = useState(user.children || []);

  const [editingChildId, setEditingChildId] = useState(null);

  const handleChange = (index, field, value) => {
    const updatedChildren = children.map((child, i) =>
      i === index
        ? { ...child, [field]: value }
        : child
    );

    setChildren(updatedChildren);
  };

  const handleSave = async (child) => {
    try {
      console.log('Saving child:', child);

const updatedChild = await updateChild(user.id, child.id, child);

console.log('Updated child:', updatedChild);

setChildren((prevChildren) =>
  prevChildren.map((c) =>
    c.id === updatedChild.id ? updatedChild : c
  )
);
      setEditingChildId(null);
    } catch (error) {
      console.error('Failed to save child', error);
    }
  };

  return (
    <div className="child-section">
      <h2>Children</h2>

      {children.length > 0 ? (
        children.map((child, index) => {
          const isEditing = editingChildId === child.id;

          return (
            <div className="child-item" key={child.id}>
              {isEditing ? (
                <>
                  <div className="child-field">
                    <label>Name:</label>

                    <input
                      type="text"
                      value={child.name}
                      onChange={(e) =>
                        handleChange(index, 'name', e.target.value)
                      }
                    />
                  </div>

                  <div className="child-field">
                    <label>Age:</label>

                    <input
                      type="number"
                      value={child.age}
                      onChange={(e) =>
                        handleChange(index, 'age', e.target.value)
                      }
                    />
                  </div>

                  <div className="child-buttons">
                    <button onClick={() => handleSave(child)}>
                      Gem
                    </button>

                    <button onClick={() => setEditingChildId(null)}>
                      Fortryd
                    </button>

                    <button onClick={() => console.log('Slet barn med navn:', child.name)}>
                      Slet barn
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="child-field">
                    <label>Name:</label>
                    <p>{child.name || 'N/A'}</p>
                  </div>

                  <div className="child-field">
                    <label>Age:</label>
                    <p>{child.age || 'N/A'}</p>
                  </div>

                  <div className="child-buttons">
                    <button
                      onClick={() => setEditingChildId(child.id)}
                    >
                      Rediger
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })
      ) : (
        <p>No children found</p>
      )}
    </div>
  );
}

export default ChildList;