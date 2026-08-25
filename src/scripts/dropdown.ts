/**
 * Shared behaviour for every `<details data-dropdown>` on the page: a dropdown
 * left open after the pointer moves elsewhere is a nuisance, and `<details>`
 * has no built-in light-dismiss.
 */
const dropdowns = () => document.querySelectorAll<HTMLDetailsElement>('details[data-dropdown]');

const closeAll = (except?: Node) => {
	for (const dropdown of dropdowns()) {
		if (!except || !dropdown.contains(except)) dropdown.open = false;
	}
};

document.addEventListener('click', (event) => closeAll(event.target as Node));

document.addEventListener('keydown', (event) => {
	if (event.key === 'Escape') closeAll();
});
