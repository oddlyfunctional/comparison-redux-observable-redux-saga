require 'rack'
require 'json'
 
like = false

translations = {
  "en" => {
    "like" => "Like",
    "unlike" => "Unlike",
  },
  "pt" => {
    "like" => "Curtir",
    "unlike" => "Descurtir",
  },
}

def respond(body)
  ['200', { 'Content-Type' => 'application/json', 'Access-Control-Allow-Origin' => '*' }, [body]]
end

app = Proc.new do |env|
  sleep rand(0.0..2.0)

  params = Rack::Utils.parse_query(env["QUERY_STRING"])

  if params["fail"] == "true"
    next ['500', { 'Access-Control-Allow-Origin' => '*' }, ["Internal error"]]
  end

  case env["PATH_INFO"]
  when /^\/translations\/(#{Regexp.union(translations.keys)})$/
    locale = $1
    respond translations[locale].to_json
  when "/like"
    if env["REQUEST_METHOD"] == "POST"
      like = !like
    end

    respond like.to_s
  else
    [401, {}, ["Not found"]]
  end
end
 
Rack::Handler::WEBrick.run app
