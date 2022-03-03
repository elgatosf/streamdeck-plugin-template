class Utils {
	/**
	 * Returns the value from a form using the form controls name property
	 * @param {*} form
	 * @returns
	 */
	static getFormValue(form) {
		if (typeof form === 'string') {
			form = document.querySelector(form);
		}

		const elements = form?.elements;

		if (!elements) {
			throw 'Could not find form!';
		}

		const formData = new FormData(form);
		let formValue = {};

		formData.forEach((value, key) => {
			if (!Reflect.has(formValue, key)) {
				formValue[key] = value;
				return;
			}
			if (!Array.isArray(formValue[key])) {
				formValue[key] = [formValue[key]];
			}
			formValue[key].push(value);
		});

		return formValue;
	}

	/**
	 * Sets the value of form controls using their name attribute and the jsn object key
	 * @param {*} jsn
	 * @param {*} form
	 */
	static setFormValue(jsn, form) {
		if (typeof form === 'string') {
			form = document.querySelector(form);
		}

		const elements = form?.elements;

		if (!elements) {
			throw 'Could not find form!';
		}

		Array.from(elements)
			.filter((element) => element?.name)
			.forEach((element) => {
				const { name, type } = element;
				const value = jsn[name];
				const isCheckOrRadio = type === 'checkbox' || type === 'radio';
				console.log(element.type)
				if (isCheckOrRadio) {
					const isSingle = value === element.value;
					if (isSingle || (Array.isArray(value) && value.includes(element.value))) {
						element.checked = true;
					}
				} else {
					element.value = value ?? '';
				}
			});
	}

	/**
	 * This provides a slight delay before processing rapid events
	 * @param {*} wait - delay before processing function (recommended time 150ms)
	 * @param {function} fn
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
