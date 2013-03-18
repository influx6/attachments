module.exports = (function() {

	var Template = function(name,version,href){
		var server =  {
			collection : Template.Collections(name,version,href)
		};

		server.Item = function(title,href){ 
			var item = Template.Item(title,href,{},[]), sb = {};

			sb.link = function(set){
				item.links.push(set);
				return this;
			};
			sb.data = function(key,value,overide){
				if(item.data[key] && !overide) return false
				item.data[key] = value;
				return this;
			};

			sb.imploade = function(){
				delete this.link;
				delete this.data;
				delete sb;
			};

			server.collection.items.push(item);
			return sb;
		}

		server.Link = function(){
			this.collection.links.push(Template.Links.apply(null,arguments));
		};

		server.template = function(view,name,data,description){
			this.collection.template[view] = Template.Template(name,data,description);
		}

		return server;
	}

	Template.Collections = function(name,version,href){
		return {
			name: name,
			version: version,
			href: href,
			links:[],
			items:[],
			template:{},
			queries:{},
			error:{}
		}
	};

	Template.Links = function(action,title,rel,href,media){
		return {
			action: action, title:title, rel:rel, href:href, media:media
		};
	};

	Template.Item = function(title,href,data,links){
		return { title:title,links:links,data:data,href:href };
	};

	Template.Template = function(title,data,description){
		return { title:title, data:data , description: description};
	};

	Template.Queries = function(title,href,rel){
		return { href:href, title:title, rel: rel || title };
	};

	return Template;
});
