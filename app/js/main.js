document.addEventListener("DOMContentLoaded", function() {
	
	let _ = (events, target, func) => {
	  events.split(' ').forEach((event) => {
	    document.addEventListener(event, (e) => {
	      [...document.querySelectorAll(target)].forEach((item) => {
	        let element = e.target;
	        if (item == element)
	          return func(e, element);
	        else{
	          while(element.parentElement){
	            if (item == element){
	              return func(e, element);
	            }
	            else
	              element = element.parentElement;
	          }
	        }
	      });
	      return false;
	    });
	  });
	};

	_('input', '[data-type]', (e, el) => {
	  let input = el;
	  if (types[el.dataset.type].test(el.value)){
	    input.classList.add('valid');
	    input.classList.remove('form__input_novalid');
	  }
	});

	let types = {
	  'email': /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/,
	  'phone': /^\+([0-9]|\(|\)|.)+$/,
	  'text': /.+/,
	}

	let validate = (form) => {
    	let inputs = [...form.querySelectorAll('[data-type]')];
    	let passed = true;
    	let password;
    
    inputs.forEach((item) => {
      
      
      if ( (types[item.dataset.type] && types[item.dataset.type].test(item.value)) ){
        item.classList.remove('form__input_novalid');
      }
      else{
        passed = false;
        item.classList.add('form__input_novalid');
      }
    });

    return passed;
  };

  let form = document.querySelector('.form');
  let btn = document.querySelector('.submit');
 
  	btn.addEventListener('click', (e) => {
  		e.preventDefault();
  		validate(form);
  	})
})