// TODOZ: test other form controls like radio and checkboxes (See previous template code);
class Utils {
	/**
	 * Returns the value from a form using the form controls name property
	 * @param {*} form 
	 * @returns 
	 */
	static getFormValue(form) {
		if (typeof form === "string") {
			form = document.querySelector(form);
		}

		const elements = form?.elements;

		if (!elements) {
			throw "Could not find form!";
		}

		return Array.from(elements)
			.filter((element) => element?.name)
			.reduce((value, element) => {
				value[element.name] = element.value;
				return value;
			}, {});
	}

	/**
	 * Sets the value of form controls using their name attribute and the jsn object key
	 * @param {*} jsn 
	 * @param {*} form 
	 */
	static setFormValue(jsn, form) {
		if (typeof form === "string") {
			form = document.querySelector(form);
		}

		const elements = form?.elements;

		if (!elements) {
			throw "Could not find form!";
		}

		Array.from(elements)
			.filter((element) => element?.name)
			.forEach((element) => {
				element.value = jsn[element.name] ?? "";
			});
	}

	/**
	 * This provides a slight delay before processing rapid events
	 * @param {*} wait - delay before processing function (recommended time 150ms)
	 * @param {*} fn
	 * @returns
	 */
	static debounce(wait, fn) {
		let timeoutId = null;
		return (...args) => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				fn.apply(null, args);
			}, wait);
		};
	}
}
