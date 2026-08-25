import { useState } from 'react';

export default function Counter() {
	const [count, setCount] = useState(0);

	return (
		<button
			type="button"
			onClick={() => setCount(count + 1)}
			className="mt-6 rounded border border-gray-300 px-3 py-1.5 text-sm dark:border-gray-700"
		>
			count: {count}
		</button>
	);
}
