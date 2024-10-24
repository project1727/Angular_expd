# Script requires testing

$GENERATE_PATH = "./.generated/protos"
mkdir -p $GENERATE_PATH

npx grpc_tools_node_protoc `
    --js_out="import_style=commonjs,binary:${GENERATE_PATH}" `
    --ts_out=${GENERATE_PATH} `
    --proto_path="..\submoduleslink\Prodigy.Common\src\Prodigy.Common.ProtoActors\Protos\;..\submoduleslink\Prodigy.Decoder.I3C\src\Prodigy.Decoder.I3C\Protos\;..\submoduleslink\Prodigy.Common\src\Prodigy.ApiAdapter\" `
    <# add proto files below #> `
    CommonTypes.proto `
    CaptureService.proto `
    CaptureTypes.proto `
    DecoderTypes.proto `
    ProtocolViews.proto `
    WaveformTypes.proto `
    I3CFrame.proto `
    MCTPFrame.proto `
    ProtoService.proto 