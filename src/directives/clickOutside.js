let uniqNameFunction = '__clickOutsideEvent__';

function unmounted(el) {
    document.removeEventListener("click", el[uniqNameFunction], false);
    delete el[uniqNameFunction];
}

function updated(el, binding, vnode) {
    if (binding.value === binding.oldValue) {
      return;
    }
  
    mounted(el, binding, vnode);
}

function mounted(el, binding, vnode) {
    unmounted(el);
    let vm = vnode.appContext;
    let callback = binding.value;
    let nextTick = false;
    
    setTimeout(function () {
        nextTick = true;
    }, 0);
    
    let listClassNames = !el.className ? null : ("." + el.className.replace(/ /g, function() {
        return " .";
    })).split(' ');
    
    el[uniqNameFunction] = event => {
        event.stopPropagation();
        let path = event.path || (event.composedPath ? event.composedPath() : undefined);
        let clickedOnExcludedEl = listClassNames ? listClassNames.some((item) => event.target.closest(item)) : false;
        let isClickOutside = (path ? path.includes(el) : (el.isEqualNode(event.target) || el.contains(event.target)));

        if (!(clickedOnExcludedEl || isClickOutside) && callback && nextTick && typeof callback === "function") {
            return callback.call(vm, event);
        }
    }
    document.addEventListener("click", el[uniqNameFunction], false);
}

const clickOutside = {
    updated,
    mounted,
    unmounted
}

export default clickOutside;