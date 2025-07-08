interface ClassName {
  className: string;
}

/**
 * A helper function to handle class name conditions easily.
 * Receives:
 *  - strings (always included),
 *  - or objects with class names as keys and booleans as values.
 *
 * Example:
 * className("btn", { active: true, hidden: false })
 * → { className: "btn active" }
 */
export function className(...classNames: Array<string | Record<string, boolean>>): ClassName {
  const classes: string[] = [];

  for (const className of classNames) {
    if (typeof className === 'object' && className !== null) {
      for (const key in className) {
        if (Object.prototype.hasOwnProperty.call(className, key) && className[key]) {
          classes.push(key);
        }
      }
    } else if (typeof className === 'string') {
      classes.push(className);
    }
  }

  return { className: classes.join(' ') };
}
