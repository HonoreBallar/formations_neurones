import { useState } from "react"

export default function TreeMenu({ items }) {
  return (
    <ul className="tree-root">
      {items.map((item, index) => (
        <TreeNode key={index} item={item} />
      ))}
    </ul>
  )
}

function TreeNode({ item }) {
  const [isOpen, setIsOpen] = useState(false)
  const hasChildren = item.children && item.children.length > 0

  const toggle = () => {
    if (hasChildren) setIsOpen((prev) => !prev)
  }

  return (
    <li className="tree-node">
      <div className="tree-label" onClick={toggle}>
        {hasChildren && (
          <span className="arrow">{isOpen ? "▼" : "▶"}</span>
        )}
        {item.label}
      </div>
      {hasChildren && isOpen && (
        <ul className="tree-children">
          {item.children.map((child, idx) => (
            <TreeNode key={idx} item={child} />
          ))}
        </ul>
      )}
    </li>
  )
}
