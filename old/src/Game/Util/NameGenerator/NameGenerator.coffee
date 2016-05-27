# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
# name_generator
# originally written and released to the public domain by drow <drow@bin.sh>
# converted to coffee class by digijin <james@digijin.com>
# http://creativecommons.org/publicdomain/zero/1.0/

class NameGenerator

	generate: (type) ->
		generate_name type

	setList: (type, list) ->
		name_set[type] = list

	# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	# generator function
	generate_name = (type) ->
		chain = undefined
		return markov_name(chain)  if chain = markov_chain(type)
		""

	# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	# generate multiple
	name_list = (type, n_of) ->
		list = []
		i = undefined
		i = 0
		while i < n_of
			list.push generate_name(type)
			i++
		list

	# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	# get markov chain by type
	markov_chain = (type) ->
		chain = undefined
		if chain = chain_cache[type]
			return chain
		else
			list = undefined
			if list = name_set[type]
				chain = undefined
				if chain = construct_chain(list)
					chain_cache[type] = chain
					return chain
		false

	# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	# construct markov chain from list of names
	construct_chain = (list) ->
		chain = {}
		i = undefined
		i = 0
		while i < list.length
			names = list[i].split(/\s+/)
			chain = incr_chain(chain, "parts", names.length)
			j = undefined
			j = 0
			while j < names.length
				name = names[j]
				chain = incr_chain(chain, "name_len", name.length)
				c = name.substr(0, 1)
				chain = incr_chain(chain, "initial", c)
				string = name.substr(1)
				last_c = c
				while string.length > 0
					c = string.substr(0, 1)
					chain = incr_chain(chain, last_c, c)
					string = string.substr(1)
					last_c = c
				j++
			i++
		scale_chain chain
	incr_chain = (chain, key, token) ->
		if chain[key]
			if chain[key][token]
				chain[key][token]++
			else
				chain[key][token] = 1
		else
			chain[key] = {}
			chain[key][token] = 1
		chain
	scale_chain = (chain) ->
		table_len = {}
		key = undefined
		for key of chain
			table_len[key] = 0
			token = undefined
			for token of chain[key]
				count = chain[key][token]
				weighted = Math.floor(Math.pow(count, 1.3))
				chain[key][token] = weighted
				table_len[key] += weighted
		chain["table_len"] = table_len
		chain

	# - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	# construct name from markov chain
	markov_name = (chain) ->
		parts = select_link(chain, "parts")
		names = []
		i = undefined
		i = 0
		while i < parts
			name_len = select_link(chain, "name_len")
			c = select_link(chain, "initial")
			name = c
			last_c = c
			while name.length < name_len
				c = select_link(chain, last_c)
				name += c
				last_c = c
			names.push name
			i++
		names.join " "
	select_link = (chain, key) ->
		len = chain["table_len"][key]
		idx = Math.floor(Math.random() * len)
		t = 0
		for token of chain[key]
			t += chain[key][token]
			return token  if idx < t
		"-"
	name_set = {}
	chain_cache = {}


module?.exports = NameGenerator